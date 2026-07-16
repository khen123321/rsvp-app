/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: '#6D071A',
        beige: '#F5F5DC',
        cream: '#F4EBE1',
        ivory: '#FDF9F0',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        pinyon: ['Pinyon Script', 'cursive'],
        georgia: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
