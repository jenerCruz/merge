/** @type {import('tailwindcss').Config} */
export default {
  presets: [require("./ui/tailwind.config.js")],
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}", "!./node_modules/**/*"],
  theme: {
    extend: {},
  },
  plugins: [],
};