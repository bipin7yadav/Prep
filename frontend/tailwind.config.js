/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        idfc: {
          red: '#9B1B33',
          'red-hover': '#7E1529',
          'red-light': '#FDF2F4',
          gold: '#C29B38',
          'gold-light': '#FEF9EE'
        }
      }
    },
  },
  plugins: [],
};
