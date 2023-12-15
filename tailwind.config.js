/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        16: "repeat(auto-fit, minmax(15rem, 25rem))",
        17: "repeat(5, minmax(15rem, 25rem))",
        18: "repeat(4, minmax(15rem, 22rem))",
      },
      screens: {
        'sm': '500px',
      },
    }
  },
  plugins: [],
}









