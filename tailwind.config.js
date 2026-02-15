/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  plugins: [require("tw-elements/plugin.cjs")],
  darkMode: "class"
}