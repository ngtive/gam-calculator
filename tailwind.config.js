/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        yekan: ['Yekan Bakh', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}

