// Imports
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
  eleventyConfig.addFilter("getPercentages", (value) => JSON.stringify(Object.values(value)));
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
  eleventyConfig.addFilter("removeSuffix", (str) => {
    // Remove P-256 & P-384 vendor name extension
    const endIdx = str.indexOf(": P-") > -1 ?
    str.indexOf(": P-") : str.length;
    return str.slice(0, endIdx);
  });

  // Copy favicon files to root
  eleventyConfig.addPassthroughCopy({ "images/favicon" : "/" });
  eleventyConfig.addPassthroughCopy("assets/");
  eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.png");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
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
