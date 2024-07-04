/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        

        ternery: "#007713",
      },
      fontFamily: {
        heading: ["Bricolage Grotesque"],
        roboto: ["Roboto"],
      },
      inset: {
        "2/10": "20%",
      },
    },
  },
  plugins: [],
};
