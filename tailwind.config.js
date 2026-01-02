/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        text: 'var(--text-color)',
        'custom-border': 'var(--border-color)',
      },
      maxWidth: {
        content: '650px',
      },
    },
  },
  plugins: [],
};
