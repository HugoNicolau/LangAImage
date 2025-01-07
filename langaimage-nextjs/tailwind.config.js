/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Add this line
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#844cf9',
      },
      fontFamily: {
        'rounded-elegance': ['Rounded Elegance', 'sans-serif'],
      }
    },
  },
  plugins: [],
};