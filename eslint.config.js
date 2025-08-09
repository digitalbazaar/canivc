import globals from 'globals';

import digitalbazaar from 'eslint-config-digitalbazaar';
import digitalbazaarJsdoc from 'eslint-config-digitalbazaar/jsdoc';
import digitalbazaarModule from 'eslint-config-digitalbazaar/module';

export default [
  ...digitalbazaar,
  ...digitalbazaarJsdoc,
  ...digitalbazaarModule,
  {
    ignores: ['_site', '!.eleventy.js'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'unicorn/prefer-node-protocol': 'error'
    }
  },
  {
    files: [
      'src/assets/js/*'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }
];
