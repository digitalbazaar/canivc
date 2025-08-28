import globals from 'globals';

import config from '@digitalbazaar/eslint-config/node-recommended';

export default [
  ...config,
  {
    ignores: ['_site', '!.eleventy.js'],
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
