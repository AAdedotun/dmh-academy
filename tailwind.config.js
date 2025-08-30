/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./auth/**/*.{html, js}",
    "./dashboard-pages/**/*.{html, js}",
    "./js/**/*.{html, js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

