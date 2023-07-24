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
					primary: "#707099",
					secondary: "#f0ecd8",
					accent: "#dfbea5",
					neutral: "#adaa9b",
					"base-100": "white",
					success: "#e5f9e7",
					"success-content": "#529D3F",
				},
			},
		],
	},
};
