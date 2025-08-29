// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        // Your brand colors are defined here
        colors: {
          primary: '#2A1B16',
          contrast: '#fefcf3',
          accent: '#CC8A52',
          shopPay: 'var(--color-shop-pay)',
        },
        // Your custom fonts, screen sizes, etc., go here
        fontFamily: {
          sans: ['Helvetica Neue', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          serif: ['"IBMPlexSerif"', 'Palatino', 'ui-serif'],
        },
        // ... (add any other extensions from your old config here)
      },
    },
    // The old v3 plugins are removed.
    plugins: [],
  };