/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c6ff33",   // neon lime-green accent
        dark: "#0d0d0d",      // main dark background
        surface: "#161616",   // card background
        border: "#262626",    // subtle border on dark bg
      },
    },
  },
  plugins: [],
};
