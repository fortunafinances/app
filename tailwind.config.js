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
					primary: "#009aed", //baby blue
					"primary-focus": "#80CCF1", //steel blue
					secondary: "#FFD4A5", //light orange
					"secondary-focus": "#FFAF6D", //dark orange
					accent: "#FFFDF4", //floral white
					neutral: "#adaa9b",
					"base-100": "white",
					success: "#e5f9e7",
					"success-content": "#529D3F",
				},
				lindsayTheme:{
					primary: "#2A0066", //persian indigo
					"primary-focus": "#F2EEFB", //magnolia
					secondary: "#E7D6FF", //perwinkle
					"secondary-focus": "#CFACFF", //mauve
					accent: "#F2EEFB", //magnolia
					info: "#7c1fff", //violet
					neutral: "#adaa9b",
					"base-100": "white",
					success: "#e5f9e7",
					"success-content": "#529D3F",
				},
				brightTheme:{
					primary: "#7c1fff", //persian indigo
					"primary-focus": "#F2EEFB", //magnolia
					secondary: "#E7D6FF", //perwinkle
					"secondary-focus": "#CFACFF", //mauve
					accent: "#F2EEFB", //magnolia
					info: "#7c1fff", //violet
					neutral: "#adaa9b",
					"base-100": "white",
					success: "#e5f9e7",
					"success-content": "#529D3F",
				},
			},
		],
	},
};
