module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/images");
	eleventyConfig.addPassthroughCopy("./src/css");
	eleventyConfig.addPassthroughCopy("./src/js");

    eleventyConfig.addFilter('getGlobalData', (data) => {
        return require(`./src/data/${data}.json`);
    });

	return {
		dir: {
			input: "src",
			data: "data",
			includes: "includes",
			output: "docs",
		},
	};
};
