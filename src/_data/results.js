const EleventyFetch = require('@11ty/eleventy-fetch');

const specUrls = [
  'https://w3c.github.io/vc-data-model-2.0-test-suite/index.json',
  'https://w3c.github.io/vc-di-ecdsa-test-suite/index.json',
  'https://w3c.github.io/vc-di-ed25519signature2020-test-suite/index.json',
  'https://w3c.github.io/vc-di-eddsa-test-suite/index.json',
  'https://w3c.github.io/vc-di-bbs-test-suite/index.json',
  'https://w3c-ccg.github.io/did-key-test-suite/index.json',
  'https://w3c-ccg.github.io/vc-api-issuer-test-suite/index.json',
  'https://w3c-ccg.github.io/vc-api-verifier-test-suite/index.json',
  'https://w3c.github.io/vc-bitstring-status-list-test-suite/index.json',
];

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
    const suffix = ': P-';
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
              {
                ...all[companyName],
                ...Object.keys(testResults[company]).reduce(
                  (allStates, state) => {
                    const previousCount = all[companyName]?.[state] || 0;
                    const count = testResults[company]?.[state] || 0;
                    return {...allStates, [state]: previousCount + count};
                  }, {})
              } :
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

// Organize data into company names containing tests
const extractTestsByCompany = results => {
  // Consolidate all tests
  const allTests = results.flatMap(result => {
    const shortName = result.respecConfig.shortName;
    return result.matrices.map(test => ({...test, shortName}));
  });
  // Organize all tests by company name
  const companies = allTests.reduce((all, current) => {
    const {columnLabel, title, shortName} = current;
    // Temporary fix to match slugified url
    const shortNameSlug = shortName.replace('.', '-');
    const url = `/reports/${shortNameSlug}/suites`;
    const labelAndLink = {label: title, url};
    current.columns.forEach(companyName => {
      companyName = removeVendorNameSuffix(companyName);
      if(!all[companyName]?.[columnLabel]) {
        all[companyName] = {...all[companyName], [columnLabel]: [labelAndLink]};
      } else {
        all[companyName][columnLabel].push(labelAndLink);
      }
    });
    return all;
  }, {});
  return companies;
};

const collectSpecListByGroup = results => {
  return results.flatMap(result => {
    const rv = result.respecConfig;
    rv.group = rv.github.split('/')[3];
    return rv;
  });
};

// Company names containing tests passed in percentages and test names
const getSpiderResults = results => {
  const testTitlesByType = {};
  // Iterate through matrices to organize test titles by type
  results.forEach(result => {
    result.matrices.forEach(m => {
      const type = m.columnLabel;
      testTitlesByType[type] = testTitlesByType[type] ?
        [...testTitlesByType[type], m.title] : [m.title];
    });
  });
  // Create structure for each vendor to organize their passing percentage
  const vendorStructure = Object.keys(testTitlesByType).reduce((all, key) => ({
    ...all,
    [key]: testTitlesByType[key].sort((a, b) => a.localeCompare(b))
      .reduce((all, title) => {
        return ({...all, [title]: null});
      }, {})
  }), {});
  // Sort and stringify list of titles to pass as prop to canvas element
  const labels = Object.keys(testTitlesByType).reduce((all, key) => ({
    ...all, [key]: JSON.stringify(
      testTitlesByType[key].sort((a, b) => a.localeCompare(b))
    )
  }), {});
  // Test types and passing percentages by vendor names
  const vendorResults = {};
  results.forEach(result => {
    result.matrices.forEach(matrix => {
      const testName = matrix.title;
      const type = matrix.columnLabel;
      matrix.suites = matrix.suites ?? [];
      matrix.suites.forEach(suite => {
        const vendor = removeVendorNameSuffix(suite.title);
        const passed = suite.tests
          .filter(test => test.state === 'passed').length;
        const total = suite.tests.length;
        const percentage = Math.round((passed / total) * 100);
        if(!vendorResults[vendor]) {
          vendorResults[vendor] = JSON.parse(JSON.stringify(vendorStructure));
        }
        vendorResults[vendor][type][testName] = percentage;
      });
    });
  });
  return {labels, vendorResults};
};

/**
 * Removes P-256 & P-384 vendor name extension.
 *
 * @param {string} vendorName - Example: Digital Bazaar: P-256.
 * @returns {string} Returns vendor name example: Digital Bazaar.
 */
function removeVendorNameSuffix(vendorName) {
  // Remove P-256 & P-384 vendor name extension
  const endIdx = vendorName.indexOf(': P-') > -1 ?
    vendorName.indexOf(': P-') : vendorName.length;
  return vendorName.slice(0, endIdx);
}

/**
 * Removes the "interop" matrices because they have no "suites" (columns)
 * and their rows are structured differently than all other matrices.
 *
 * @param {Array} results - Results from urls.
 * @returns {Array} Results without interop matrices.
 */
function removeInteropTestResults(results) {
  const curatedResults = results.map(result => ({
    ...result,
    matrices: result.matrices.filter(matrix => {
      const testName = matrix.title.toLowerCase();
      return !testName.includes('interop');
    })
  }));
  return curatedResults;
}

// Repeated fetch
module.exports = async function() {
  /* This returns a promise */
  const promises = specUrls.map(url =>
    EleventyFetch(url, {
      duration: '1w', // save for 1 week
      type: 'json', // we’ll parse JSON for you
    })
  );

  let results = await Promise.allSettled(promises);

  // Handle rejected request
  results = results.reduce((all, result) => {
    if(result.status !== 'fulfilled') {
      console.error('Failed to fetch resource:', result.reason);
    }
    return result.status !== 'fulfilled' ? all : [...all, result.value];
  }, []);

  /* Temporarily remove interop matrices */
  results = removeInteropTestResults(results);

  return {
    all: results,
    vendorChartData: getSpiderResults(results),
    testsByCompany: extractTestsByCompany(results),
    companiesByTestType: extractCompanyResultsByTestType(results),
    specsByGroup: collectSpecListByGroup(results)
  };
};
