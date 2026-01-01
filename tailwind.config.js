/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        text: 'var(--text-color)',
        'custom-border': '#333333',
      },
      maxWidth: {
        content: '650px',
      },
    },
  },
  plugins: [],
};
