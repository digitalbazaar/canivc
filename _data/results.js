const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function() {
  const urls = [
    'https://w3c.github.io/vc-di-eddsa-test-suite/index.json',
    'https://w3c.github.io/vc-di-ecdsa-test-suite/index.json',
    'https://w3c.github.io/vc-di-ed25519signature2020-test-suite/index.json',
    'https://w3c-ccg.github.io/did-key-test-suite/index.json',
    'https://w3c-ccg.github.io/status-list-2021-test-suite/index.json',
    'https://w3c-ccg.github.io/vc-api-issuer-test-suite/index.json'
  ];

  /* This returns a promise */
  const promises = urls.map(url => EleventyFetch(url, {
    duration: '1w', // save for 1 week
    type: 'json' // we’ll parse JSON for you
  }));
  const results = await Promise.all(promises);
  return results;
};
