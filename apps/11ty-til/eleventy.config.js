/** @param {import("@11ty/eleventy/UserConfig").UserConfig} eleventyConfig */
export const config = {
	dir: {
		input: ".",
		output: "_site",
		// These are both relative to your input directory!
		includes: "_includes",
		layouts: "_layouts",
	},
};
