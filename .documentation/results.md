## Result Schema:
### Description
Top level object returned from GET request to url.
```js
console.log(results);
```
Example:
```json
[
  {
    matrices: [ [Object], [Object], [Object], [Object], ... ],
    tables: [],
    summary: [],
    respecConfig: {
      specStatus: 'base',
      shortName: 'vc-di-eddsa-test-suite',
      subtitle: 'Interoperability test suite for EdDSA Data Integrity...',
      github: 'https://github.com/w3c/vc-di-eddsa-test-suite',
      edDraftURI: 'https://w3c.github.io/vc-di-eddsa-test-suite',
      doJsonLd: true,
      includePermalinks: false,
      editors: [Array],
      authors: [Array],
      title: 'Data Integrity eddsa 2022 Interoperability Report 1.0'
    },
    title: 'Data Integrity eddsa 2022 Interoperability Report 1.0',
    stats: [
      'Tests passed 253/272 93%',
      'Tests failed 19/272 7%',
      'Failures 19',
      'Tests skipped 0',
      'Total tests 272'
    ]
  },
  ...otherResultObjects
]
```

## Result Matrices Schema:
result > matrices > matrix
```
├── result
│   ├── matrices
│   │   ├── list of matrices
│   ├── otherResultProperties
```
### Description
Every result has a list of matrices (tables) for displaying test results for
multiple implementors.
```js
console.log(results[0].matrices);
```
Example:
```json
[
  {
    matrices: [
      {
        title: 'Data Integrity (eddsa-rdfc-2022 issuers)',
        ctx: null,
        suites: [ [Object], [Object], [Object], [Object], [Object] ],
        root: false,
        pending: false,
        _retries: -1,
        _beforeEach: [],
        _beforeAll: [],
        _afterEach: [],
        _afterAll: [],
        _timeout: 15000,
        _slow: 75,
        _bail: false,
        _onlyTests: [],
        _onlySuites: [],
        delayed: false,
        parent: 'WB0tBpbWKr_QvsWRgAdFG',
        file: '/home/runner/work/vc-di-eddsa-test-suite/vc-di-eddsa-...',
        matrix: true,
        report: true,
        rowLabel: 'Test Name',
        columnLabel: 'Issuer',
        _testId: 'urn:uuid:e89a7911-c9f3-47a0-a175-004fc9bb1e38',
        columns: [ 'apicatalog.com', 'Digital Bazaar', 'SpruceID', ... ],
        rows: [ [Object], [Object], [Object], [Object], ... ],
        reportDetails: {
          specStatus: 'base',
          shortName: 'vc-di-eddsa-test-suite',
          subtitle: 'Interoperability test suite for EdDSA Data Integrity...',
          github: 'https://github.com/w3c/vc-di-eddsa-test-suite',
          edDraftURI: 'https://w3c.github.io/vc-di-eddsa-test-suite',
          doJsonLd: true,
          includePermalinks: false,
          editors: [Array],
          authors: [Array],
          title: 'Data Integrity eddsa 2022 Interoperability Report 1.0'
        }
      },
      ...otherMatrixObjects
    ],
    ...otherResultProperties,
  },
  ...otherResultObjects
]
```

## Matrix Row Schema:
result > matrices > matrix > rows > row
```
├── result
│   ├── matrices
│   │   ├── matrix
│   │   │   ├── rows
│   │   │   │   ├── list of rows
│   │   ├── otherMatrixObjects
│   ├── otherResultProperties
```
### Description
Each matrix (table) contains a list of table rows. Each row is a test that contains
row cells.
```js
console.log(results[0].matrices[0].rows);
```
Example:
```json
[
  {
    matrices: [
       {
        rows: [
          {
            id: '"proof" field MUST exist and MUST be either a single object...',
            cells: [ [Object], [Object], [Object], [Object], [Object] ]
          },
          ...otherRowObjects
        ],
        ...otherMatrixProperties
      },
      ...otherMatrixObjects
    ],
    ...otherResultProperties
  },
  ...otherResultObjects
]
```

## Matrix Row Cell Schema:
result > matrices > rows > row > cells > cell
```
├── result
│   ├── matrices
│   │   ├── matrix
│   │   │   ├── rows
│   │   │   │   ├── row
│   │   │   │   │   ├── cells
│   │   │   │   │   │   ├── cell
│   │   │   │   │   │   │   ├── testResultData
│   │   │   │   │   │   ├── otherCells
│   │   │   │   ├── otherRowObjects
│   │   ├── otherMatrixObjects
│   ├── otherResultProperties
```
### Description
Each cell in a row is the test result of the same test for a different
implementor (cell.columnId).
```js
console.log(results[0].matrices[0].rows[0].cells);
```
Example:
```json
[
  {
    matrices: [
      {
        rows: [
          {
            id: 'if "proof.id" field exists, it MUST be a valid URL.',
            cells: [
              {
                type: 'test',
                title: '"proof" field MUST exist and MUST be either a...',
                body: <stringified JS test function>,
                async: 0,
                sync: true,
                _timeout: 15000,
                _slow: 75,
                _retries: -1,
                timedOut: false,
                _currentRetry: 0,
                pending: false,
                file: '/home/runner/work/vc-di-eddsa-test-suite/vc-di-...',
                parent: 'mq7g4Avu-cMXmb32GiSda',
                ctx: null,
                _testId: 'urn:uuid:9e8bab6a-4a63-43cd-b3b6-e3becbe2498b',
                _events: {},
                _eventsCount: 1,
                cell: {
                  columnId: 'apicatalog.com',
                  rowId: '"proof" field MUST exist and MUST be either a...'
                },
                duration: 0,
                state: 'passed',
                speed: 'fast'
              },
              ...otherCellObjects
            ]
          },
          ...otherRowObjects
        ]
        ...otherMatrixProperties
      },
      ...otherMatrixObjects
    ],
    ...otherResultProperties
  },
  ...otherResultObjects
]  
```

## Matrix Suites Schema:
result > matrices > matrix > suites > suite
```
├── result
│   ├── matrices
│   │   ├── matrix
│   │   │   ├── suites
│   │   │   │   ├── list of suites
│   │   ├── otherMatrixObjects
│   ├── otherResultProperties
```
### Description
Each test suite has a title which the name of a different implementor.
```js
console.log(results[0].matrices[0].suites);
```
Example:
```json
[
  {
    matrices: [
      {
        suites: [
          {
            title: 'apicatalog.com',
            ctx: null,
            suites: [],
            tests: [ [Object], [Object], [Object], [Object], [Object], ... ],
            root: false,
            pending: false,
            _retries: -1,
            _beforeEach: [],
            _beforeAll: [ [Object] ],
            _afterEach: [],
            _afterAll: [],
            _timeout: 15000,
            _slow: 75,
            _bail: false,
            _onlyTests: [],
            _onlySuites: [],
            delayed: false,
            parent: 'JsPAFa9LhzIWGxP3PPXHo',
            file: '/home/runner/work/vc-di-eddsa-test-suite/vc-di-eddsa-...',
            _testId: 'urn:uuid:e8d5f14d-0b2c-4529-976c-afb32e13e3bc'
          },
          ...otherSuiteObjects
        ],
        ...otherMatrixProperties
      },
      ...otherMatrixObjects
    ],
    ...otherResultProperties
  },
  ...otherResultObjects
]
```

## Suite Tests Schema:
result > matrices > matrix > suites > suite > tests > test
```
├── result
│   ├── matrices
│   │   ├── matrix
│   │   │   ├── suites
│   │   │   │   ├── suite
│   │   │   │   │   ├── tests
│   │   │   │   │   │   ├── test
│   │   │   │   │   │   │   ├── testResultData
│   │   │   │   │   │   ├── otherTests
│   │   │   │   │   ├── otherSuiteProperties
│   │   │   │   ├── otherSuites
│   │   ├── otherMatrixObjects
│   ├── otherResultProperties
```
### Description
Tests is a list of all of the test results for a given implementor.
```js
console.log(results[0].matrices[0].suites[0].tests);
```
Example:
```json
[
  {
    matrices: [
      {
        suites: [
          {
            tests: [
              {
                type: 'test',
                title: '"proof" field MUST exist and MUST be either a...',
                body: <stringified JS test function>,
                async: 0,
                sync: true,
                _timeout: 15000,
                _slow: 75,
                _retries: -1,
                timedOut: false,
                _currentRetry: 0,
                pending: false,
                file: '/home/runner/work/vc-di-eddsa-test-suite/vc-di-...',
                parent: 'mq7g4Avu-cMXmb32GiSda',
                ctx: null,
                _testId: 'urn:uuid:9e8bab6a-4a63-43cd-b3b6-e3becbe2498b',
                _events: {},
                _eventsCount: 1,
                cell: {
                  columnId: 'apicatalog.com',
                  rowId: '"proof" field MUST exist and MUST be either a...'
                },
                duration: 0,
                state: 'passed',
                speed: 'fast'
              },
              ...otherTests
            ],
            ...otherSuiteProperties
          },
          ...otherSuiteObjects
        ],
        ...otherMatrixProperties
      },
      ...otherMatrixObjects
    ],
    ...otherResultProperties
  },
  ...otherResultObjects
]
```
