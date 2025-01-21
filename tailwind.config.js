/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./html/**/*.html",
    "./css/**/*.css",
    "./js/**/*.js",
    "./index.html",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#0d6efd",
        primaryHover: "#3284e8",
        secondary: "#eb5f2f",
        secondaryHover: "#ff6b38",
        card: "#f6f6f6",
        cardHover: "#ffffff",
      },
      colors: {
        primary: "#0d6efd",
        secondary: "#eb5f2f",
        textColor: "#000000",
        textFlatColor: "#727374",
      },
    },
  },
  plugins: [],
};
