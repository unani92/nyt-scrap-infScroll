/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          200: '#F0F1F4',
          350: '#C4C4C4',
        },
        black: {
          80: '#6D6D6D',
        },
      },
    },
  },
  plugins: [],
};
