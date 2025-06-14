/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
				// Headlines (Impactful & Stylish)
				sora: ["Sora", "sans-serif"],
				// Body Text (Clean & Friendly)
				"dm-sans": ["DM Sans", "sans-serif"],
				// Numbers & Metrics (Strong Visual Presence)
				"space-grotesk": ["Space Grotesk", "sans-serif"],
			},
			colors: {
				// Custom color scheme
				"sage-green": "#A8D5BA",
				"dusty-blue": "#7BAFD4",
				"off-white": "#F4F6F5",
				"soft-coral": "#F6B8A3",
				"charcoal-gray": "#2E2E2E",
				// Shadcn/ui color system
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
		},
	},
	plugins: [],
};
