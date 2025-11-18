/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#0ea5a4",
        muted: "#9aa4b2",
        darkBg: "#06111a",
        darkBg2: "#071425",
      },
    },
  },
  plugins: [],
};
