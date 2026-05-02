import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors (amber/black)
        secondary: '#904d00',
        'secondary-container': '#fe932c',
        'secondary-fixed': '#ffdcc3',
        'secondary-fixed-dim': '#ffb77d',
        'on-secondary': '#ffffff',
        'on-secondary-fixed': '#2f1500',
        'on-secondary-fixed-variant': '#6e3900',
        'on-secondary-container': '#663500',
        
        // Primary (black/slate)
        'primary-container': '#141b2b',
        'primary-fixed': '#dce2f7',
        'primary-fixed-dim': '#c0c6db',
        'on-primary-fixed': '#141b2b',
        'on-primary-fixed-variant': '#404758',
        'on-primary-container': '#7d8497',
        
        // Neutral surfaces
        'surface': '#f8f9ff',
        'surface-bright': '#f8f9ff',
        'surface-dim': '#ccdbf2',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#eef4ff',
        'surface-container': '#e5efff',
        'surface-container-high': '#dbe9ff',
        'surface-container-highest': '#d4e4fa',
        'surface-variant': '#d4e4fa',
        'surface-tint': '#575e70',
        'inverse-surface': '#233143',
        'on-surface': '#0d1c2d',
        'on-surface-variant': '#45464c',
        'inverse-on-surface': '#e9f1ff',
        'on-background': '#0d1c2d',
        'background': '#f8f9ff',
        
        // Tertiary
        'tertiary': '#000000',
        'tertiary-container': '#0d1c2d',
        'tertiary-fixed': '#d4e4fa',
        'tertiary-fixed-dim': '#b9c8de',
        'on-tertiary': '#ffffff',
        'on-tertiary-fixed': '#0d1c2d',
        'on-tertiary-fixed-variant': '#39485a',
        'on-tertiary-container': '#768599',
        
        // Error
        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
        
        // Other
        'outline': '#76777d',
        'outline-variant': '#c6c6cd',
        'inverse-primary': '#c0c6db',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
      fontFamily: {
        headline: ['Inter'],
        body: ['Inter'],
        label: ['Inter'],
      },
    },
  },
  plugins: [],
}
export default config
