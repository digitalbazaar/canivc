module.exports = {
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'commonjs'
  },
  ignorePatterns: ['_site'],
  extends: [
    'eslint-config-digitalbazaar',
    'eslint-config-digitalbazaar/jsdoc'
  ],
  rules: {
    'jsdoc/check-examples': 0
  },
  overrides: [
    {
      files: ['assets/js/*'],
      env: {
        browser: true
      },
      sourceType: 'module'
    }
  ]
};
