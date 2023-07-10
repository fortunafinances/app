/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],

	daisyui: {
		themes: [
			{
			mytheme: {
				"primary": "#707099",
				"secondary": "#f0ecd8",
				"accent":"#dfbea5",
				"neutral": "#adaa9b",
				"base-100": "white",
				"success": "#e5f9e7",
				"success-content": "#c4e4bc",
			}	
			}
		]
	}
};

