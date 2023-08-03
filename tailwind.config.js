/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
	mode: "jit",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Inter", "PT Sans", "sans-serif"],
		},
		extend: {},
	},
	plugins: [daisyui],

	daisyui: {
		themes: [
			{
				lindsayTheme: {
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
			},
		],
	},
};
