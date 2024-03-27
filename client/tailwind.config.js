/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "xxs": "280px",
        "xs": "375px",
        "mobl": "425px",
        ...defaultTheme.screens,
      },
    }
  },
  plugins: [],
}