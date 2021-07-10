

module.exports = function(eleventyConfig) {
    // eleventyConfig.setTemplateFormats([
    //   "css" // css is not yet a recognized template extension in Eleventy
    // ]);

    // Copy over assets/ folder
    eleventyConfig.addPassthroughCopy({ "src/_assets/": "./_assets/" });

    // https://www.11ty.dev/docs/quicktips/inline-css/
    // eleventyConfig.addFilter("cssmin", function(code) { 
    //   return new CleanCSS({}).minify(code).styles;
    // });
   
    return {
      dir: {
        input: "src",
        output: "_site"
      }
    };
  };