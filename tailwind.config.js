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
        sm: '8px',
        md: '16px',
        lg: '30px',
      },
      lineHeight: {
        24: '24px',
      },
      letterSpacing: {
        m8: '-0.8px',
        m56: '-0.56px',
      },
      colors: {
        gray: {
          100: '#F2F2F2',
          200: '#F0F1F4',
          350: '#C4C4C4',
        },
        black: {
          80: '#6D6D6D',
          100: '#000',
        },
        blue: {
          500: '#3478F6',
        },
        skyblue: {
          500: '#82B0F4',
        },
      },
    },
  },
  plugins: [],
};
