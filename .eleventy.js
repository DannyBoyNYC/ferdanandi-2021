module.exports = function (eleventyConfig) {
  // https://github.com/11ty/eleventy/issues/898
  // https://www.11ty.dev/docs/collections/
  // function sortByOrder(values) {
  //   let vals = [...values]; // this *seems* to prevent collection mutation...
  //   return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
  // }

  eleventyConfig.addCollection('orderedProjects', function (collection) {
    return collection.getFilteredByTag('projects').sort((a, b) => {
      return a.data.order - b.data.order;
    });
  });

  // eleventyConfig.addFilter('sortByOrder', sortByOrder);

  eleventyConfig.addPassthroughCopy({ 'src/img/': './img/' });
  eleventyConfig.addPassthroughCopy({ 'src/js/': './js/' });
  eleventyConfig.addPassthroughCopy({ 'src/css/': './css/' });

  eleventyConfig.addWatchTarget('./src/img/');
  eleventyConfig.addWatchTarget('./src/js/');
  eleventyConfig.addWatchTarget('./src/css/');

  eleventyConfig.setBrowserSyncConfig({
    notify: true,
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
  };
};
