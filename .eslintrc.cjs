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
      files: ['src/assets/js/*'],
      env: {
        browser: true
      },
      parserOptions: {
        sourceType: 'module'
      }
    }
  ]
};
