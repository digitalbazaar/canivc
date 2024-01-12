const EleventyFetch = require("@11ty/eleventy-fetch");

// Organize data into company test results by test type
const extractCompanyResultsByTestType = results => {
  // Helper function: Extract all test results for each test
  const getTestResults = (all, currentSuite) => {
    const {title, tests} = currentSuite;
    return {
      ...all,
      [title]: tests.reduce((all, test) => {
        const testState = test.state;
        all[testState] = all[testState] ? all[testState] + 1 : 1;
        return {total: tests.length, ...all};
      }, {}),
    };
  };

  // Helper function: Remove company name suffix (Digital Bazaar: P-256)
  const removeCompanySuffix = company => {
    const suffix = ": P-";
    const indexToRemove = company.indexOf(suffix);
    return indexToRemove > -1 ? company.slice(0, indexToRemove) : company;
  };

  // Organize all test suite data by test type (Issuer, Verifier, etc)
  const testSuiteDataByTestType = results
    .flatMap(r => r.matrices)
    .reduce((all, testSuiteData) => {
      const testType = testSuiteData.columnLabel;
      return {...all, [testType]: [...(all[testType] || []), testSuiteData]};
    }, {});

  // Organize each test suite result by test type (Issuer, Verifier, etc)
  const testResultsByTestType = Object.keys(testSuiteDataByTestType).reduce(
    (all, testType) => {
      return {
        ...all,
        [testType]: testSuiteDataByTestType[testType].map(({suites}) => {
          return suites.reduce(getTestResults, {});
        }),
      };
    },
    {}
  );

  // Format each company name and their test results under each test type
  const companyResultsByTestType = Object.keys(testResultsByTestType).reduce(
    (allTestTypes, testType) => {
      const companyTotals = testResultsByTestType[testType]
        .reduce((all, testResults) => {
          Object.keys(testResults).forEach(company => {
            const companyName = removeCompanySuffix(company);
            all[companyName] = all[companyName] ?
              Object.keys(testResults[company]).reduce(
                (allStates, state) => {
                  const previousCount = all[companyName]?.[state] || 0;
                  const count = testResults[company]?.[state] || 0;
                  return {...allStates, [state]: previousCount + count};
                }, {}) :
              testResults[companyName];
          });
          return all;
        }, {});

      // Organize company data and sort by most tests passed
      allTestTypes[testType] = Object.keys(companyTotals).map(companyName => {
        const defaultValues = {passed: 0, failed: 0, total: 0, pending: 0};
        return {
          text: companyName,
          ...defaultValues,
          ...companyTotals[companyName]
        };
      }).sort((a, b) => (b.passed || 0) - (a.passed || 0));
      return allTestTypes;
    },
    {}
  );

  return companyResultsByTestType;
};

// Repeated fetch
module.exports = async function() {
  const urls = [
    "https://w3c.github.io/vc-di-eddsa-test-suite/index.json",
    "https://w3c.github.io/vc-di-ecdsa-test-suite/index.json",
    "https://w3c.github.io/vc-di-ed25519signature2020-test-suite/index.json",
    "https://w3c-ccg.github.io/did-key-test-suite/index.json",
    "https://w3c-ccg.github.io/status-list-2021-test-suite/index.json",
    "https://w3c-ccg.github.io/vc-api-issuer-test-suite/index.json",
  ];

  /* This returns a promise */
  const promises = urls.map(url =>
    EleventyFetch(url, {
      duration: "1w", // save for 1 week
      type: "json", // we’ll parse JSON for you
    })
  );

  const results = await Promise.all(promises);

  const companiesByTestType = extractCompanyResultsByTestType(results);

  return {all: results, companiesByTestType};
};

