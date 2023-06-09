module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/images");
	eleventyConfig.addPassthroughCopy("./src/css");
	eleventyConfig.addPassthroughCopy("./src/js");

	return {
		dir: {
			input: "src",
			data: "data",
			includes: "includes",
			output: "docs",
		},
	};
};
