/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xs: '10px',
        sm: '13px',
        md: '14px',
        lg: '18px',
      },
      borderRadius: {
        lg: '30px',
      },
      lineHeight: {
        24: '24px',
      },
      letterSpacing: {
        m56: '-0.56px',
      },
      colors: {
        gray: {
          200: '#F0F1F4',
          350: '#C4C4C4',
        },
        black: {
          80: '#6D6D6D',
          100: '#000',
        },
      },
    },
  },
  plugins: [],
};
