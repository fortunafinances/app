/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
	mode: "jit",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["PT Sans", "sans-serif"],
		},
		extend: {},
	},
	plugins: [daisyui],

	daisyui: {
		themes: [
			{
				myTheme: {
					primary: "#80CCF1", //baby blue
					"primary-focus": "#009aed", //steel blue
					secondary: "#FFD4A5", //light orange
					"secondary-focus": "#FFAF6D", //dark orange
					accent: "#FFFDF4", //floral white
					neutral: "#adaa9b",
					"base-100": "white",
					success: "#e5f9e7",
					"success-content": "#529D3F",
				},
			},
		],
	},
};
