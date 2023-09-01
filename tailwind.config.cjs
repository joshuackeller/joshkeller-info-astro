/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				camden: {
					blue: "#C1E2EA",
					red: "#E10438",
					yellow: "#EFC60B",
					green: "#53776B"
				}
		},
		},
		plugins: [],
	}
}
