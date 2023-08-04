/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
	mode: "jit",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Inter", "PT Sans", "sans-serif"],
		},
		screens: {
			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "900px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
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
