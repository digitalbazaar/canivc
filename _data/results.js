const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function() {
  let url = 'https://w3c.github.io/vc-di-eddsa-test-suite/index.json';

  /* This returns a promise */
  return EleventyFetch(url, {
    duration: '1w', // save for 1 week 
    type: 'json'    // we’ll parse JSON for you
  });
};
