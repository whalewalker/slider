/** @type {import('tailwindcss').Config} */
// @ts-ignore
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '500px',
      },
    }
  },
  plugins: [],
})









