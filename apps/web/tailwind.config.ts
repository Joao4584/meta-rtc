import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		height: {
  			'100': '24rem'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundColor: {
  			'gray-header': '#272d3a',
  			'gray-header-input': '#202430',
  			'gray-main-1': '#0E1117',
  			'gray-main-2': '#11141B',
  			'gray-btn-card': '#222632',
  			'cyber-grape': {
  				'50': '#F6F5F8',
  				'100': '#CAC3D4',
  				'200': '#9E92B0',
  				'300': '#71608D',
  				'400': '#4A356A',
  				'500': '#412E5D',
  				'600': '#372850',
  				'700': '#2E2142',
  				'800': '#251A35',
  				'900': '#1B1427',
  				'950': '#120D1A'
  			}
  		},
  		boxShadowColor: {
  			'cyber-grape': {
  				'50': '#F6F5F8',
  				'100': '#CAC3D4',
  				'200': '#9E92B0',
  				'300': '#71608D',
  				'400': '#4A356A',
  				'500': '#412E5D',
  				'600': '#372850',
  				'700': '#2E2142',
  				'800': '#251A35',
  				'900': '#1B1427',
  				'950': '#120D1A'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
