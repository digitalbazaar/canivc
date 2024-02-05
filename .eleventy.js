// Imports
const sass = require("sass");
const markdownIt = require("markdown-it");
const { execSync } = require("child_process");
const legend = require("./_data/legend.json");
const BarRating = require("./_shortcodes/BarRating");
const markdownItAnchor = require("markdown-it-anchor");
const mermaidShortcode = require("./_shortcodes/mermaid");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyMermaidPlugin = require("@kevingimbel/eleventy-plugin-mermaid");
const mermaidFullscreenJsShortcode = require("./_shortcodes/mermaid_fullscreen_js");

// Constants
const statusMarks = legend.reduce((all, statusMark) => {
  return { ...all, [statusMark.id]: statusMark.icon };
}, {});
const statusColors = legend.reduce((all, statusMark) => {
  return { ...all, [statusMark.id]: statusMark.color };
}, {});
const statusLabel = legend.reduce((all, statusMark) => {
  return { ...all, [statusMark.id]: statusMark.label };
}, {});

// Eleventy Configurations
module.exports = function (eleventyConfig) {
  /* Markdown Overrides */
  const markdownLibrary = markdownIt({
    html: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: false,
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyMermaidPlugin, {
    extra_classes: "attached",
  });

  // Shortcode components
  eleventyConfig.addShortcode("BarRating", BarRating);

  // add custom JS for loading SVG pan/zoom features
  eleventyConfig.addShortcode(
    "mermaid_with_callback_js",
    mermaidFullscreenJsShortcode
  );
  // add fullscreen-able mermaid display
  eleventyConfig.addPairedShortcode("mermaid", mermaidShortcode);

  // Filter functions
  eleventyConfig.addFilter("getStatusMark", (status) => statusMarks[status]);
  eleventyConfig.addFilter("getStatusLabel", (status) => statusLabel[status]);
  eleventyConfig.addFilter("getStatusColors", (status) => statusColors[status]);
  eleventyConfig.addFilter("getOptional", (optional) => {
    return optional ? "optional" : "not-optional";
  });
  eleventyConfig.addFilter("formatJSON", (data) => {
    return JSON.stringify(data, null, "\n");
  });
  eleventyConfig.addFilter("findObjectByProperty", (data, prop, value) => { 
    return data ? data.find(item => item[prop] === value) : {};
  });
  eleventyConfig.addFilter("removeQuotes", (str) => {
    return str && str.replaceAll('"', "'");
  });

  eleventyConfig.addTemplateFormats("scss");
  // Creates the extension for use
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css", // optional, default: 'html'
    // `compile` is called once per .scss file in the input directory
    compile: async function (inputContent) {
      let result = sass.compileString(inputContent, { loadPaths: ["_sass/"] });

      // This is the render function, `data` is the full data cascade
      return async (data) => {
        return result.css;
      };
    },
  });

  eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.png");

  // Run pagefind script after site has built
  eleventyConfig.on("eleventy.after", () => {
    execSync(`npx -y pagefind --site _site`, { encoding: "utf-8" });
  });

  // Return your Object options:
  return {
    dir: {
      layouts: "_layouts",
    },
  };
};
