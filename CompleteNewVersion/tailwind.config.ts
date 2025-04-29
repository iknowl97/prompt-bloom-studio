import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: "rgb(var(--background) / <alpha-value>)",
				foreground: 'hsl(var(--foreground))',
				primary: {
					50: "rgb(var(--primary-50) / <alpha-value>)",
					100: "rgb(var(--primary-100) / <alpha-value>)",
					200: "rgb(var(--primary-200) / <alpha-value>)",
					300: "rgb(var(--primary-300) / <alpha-value>)",
					400: "rgb(var(--primary-400) / <alpha-value>)",
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				prompt: {
					50: '#f5f3ff',
					100: '#ede9fe', 
					200: '#ddd6fe',
					300: '#c4b5fd',
					400: '#a78bfa',
					500: '#8b5cf6',
					600: '#7c3aed',
					700: '#6d28d9',
					800: '#5b21b6',
					900: '#4c1d95',
					950: '#2e1065',
				},
				secondary: {
					50: "rgb(var(--secondary-50) / <alpha-value>)",
					100: "rgb(var(--secondary-100) / <alpha-value>)",
					200: "rgb(var(--secondary-200) / <alpha-value>)",
					300: "rgb(var(--secondary-300) / <alpha-value>)",
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					50: "rgb(var(--accent-50) / <alpha-value>)",
					100: "rgb(var(--accent-100) / <alpha-value>)",
					200: "rgb(var(--accent-200) / <alpha-value>)",
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				gray: {
					50: '#fafafa',
					100: '#f4f4f5',
					200: '#e4e4e7',
					300: '#d4d4d8',
					400: '#a1a1aa',
					500: '#71717a',
					600: '#52525b',
					700: '#3f3f46',
					800: '#27272a',
					900: '#18181b',
					950: '#09090b',
				},
				"text-primary": "rgb(var(--text-primary) / <alpha-value>)",
				"text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
				success: "rgb(var(--success) / <alpha-value>)",
				warning: "rgb(var(--warning) / <alpha-value>)",
				error: "rgb(var(--error) / <alpha-value>)",
				info: "rgb(var(--info) / <alpha-value>)",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				heading: ["Poppins", "sans-serif"],
				mono: ["JetBrains Mono", "monospace"],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gradient-shift': 'gradient-shift 10s ease infinite',
				'float': 'float 3s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out forwards'
			},
			backgroundImage: {
				'gradient-ai': 'linear-gradient(135deg, #1a1a1a 0%, #373737 100%)',
				'gradient-ai-hover': 'linear-gradient(135deg, #2b2b2b 0%, #404040 100%)',
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
