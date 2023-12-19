// Imports
const sass = require('sass');
const markdownIt = require('markdown-it');
const legend = require('./_data/legend.json');
const BarRating = require("./_shortcodes/BarRating")
const markdownItAnchor = require('markdown-it-anchor');
const mermaidShortcode = require('./_shortcodes/mermaid');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const eleventyMermaidPlugin = require('@kevingimbel/eleventy-plugin-mermaid');
const mermaidFullscreenJsShortcode = require('./_shortcodes/mermaid_fullscreen_js');

// Constants
const statusMarks = legend.reduce((all, statusMark) => {
  return { ...all, [statusMark.id]: statusMark.icon };
}, {});

// Helper Functions
const noCircular = (key, value) => {
  const circular = ['ctx', 'parent'];
  if(circular.includes(key)) {
    // replace circular refs with their id or null
    return value.id || null;
  }
  return value;
};

function formatJSON({data, replacer = noCircular}) {
  return JSON.stringify(data, replacer, 2);
};

// Eleventy Configurations
module.exports = function(eleventyConfig) {
  /* Markdown Overrides */
  const markdownLibrary = markdownIt({
    html: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: false
  });
  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyMermaidPlugin, { extra_classes: 'attached' });
  
  // Shortcode components
  eleventyConfig.addShortcode('BarRating', BarRating);

  // add custom JS for loading SVG pan/zoom features
  eleventyConfig.addShortcode('mermaid_with_callback_js', mermaidFullscreenJsShortcode);
  // add fullscreen-able mermaid display
  eleventyConfig.addPairedShortcode('mermaid', mermaidShortcode);

  eleventyConfig.addFilter('getOptional', (optional) => optional ? 'optional' : 'not-optional');
  eleventyConfig.addFilter('getStatusMark', (status) => statusMarks[status]);
  eleventyConfig.addFilter('formatJSON', (data) => JSON.stringify(data, null, 2));
  eleventyConfig.addFilter('formatError', ({name, message, stack} = {}) =>
    formatJSON({data: {name, message, stack}}));

  eleventyConfig.addTemplateFormats('scss');
  // Creates the extension for use
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css', // optional, default: 'html'

    // `compile` is called once per .scss file in the input directory
    compile: async function(inputContent) {
      let result = sass.compileString(inputContent, { loadPaths: ['_sass/'] });

      // This is the render function, `data` is the full data cascade
      return async (data) => {
        return result.css;
      };
    }
  });

  eleventyConfig.addPassthroughCopy('**/*.jpg');
  eleventyConfig.addPassthroughCopy('**/*.png');

  // Return your Object options:
  return {
    dir: {
      layouts: '_layouts'
    }
  }
};
