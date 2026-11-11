/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBFBF8',
        forest: '#002156',
        rust: '#FD6202',
        neon: '#E7E409',
        ite: { navy: '#002156', lime: '#E7E409', orange: '#FD6202' },
      },
      fontFamily: {
        serif: ['"Montserrat Variable"', 'Arial', 'sans-serif'],
        sans: ['"Montserrat Variable"', 'Arial', 'sans-serif'],
      },
      boxShadow: { soft: '0 12px 34px rgba(0, 33, 86, 0.08)' },
    },
  },
  plugins: [],
};
