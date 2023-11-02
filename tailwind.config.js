/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors:{
        'local-purple': '#6556EE',
        'local-purple-100': '#5949f3',
        'local-purple-200': '#493ecc',
      }
    },
  },
  plugins: [],
}

