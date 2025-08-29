// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Updated to support opacity modifiers like /90, /50, etc.
      colors: {
        primary: {
          DEFAULT: '#2A1B16',
          50: '#f7f4f2',
          100: '#ede8e4', 
          200: '#dbd0c9',
          300: '#c9b9ae',
          400: '#a68e7d',
          500: '#82634c',
          600: '#2A1B16',
          700: '#241711',
          800: '#1e130e',
          900: '#180f0b',
        },
        contrast: '#fefcf3',
        accent: '#CC8A52',
        shopPay: 'var(--color-shop-pay)',
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"IBMPlexSerif"', 'Palatino', 'ui-serif'],
      },
    },
  },
  plugins: [
    // Re-added the required plugins
    '@tailwindcss/forms',
    '@tailwindcss/typography',
  ],
};