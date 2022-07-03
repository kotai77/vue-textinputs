/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,vue}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "corporate"],
  },
}
