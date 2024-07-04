/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        ternery: "#007713",
        bg_green: "#a1e57e",
      },
      backgroundImage: {
        'about-image': "url('/src/assets/images/About_bg.jpg')",
        'signin-image':"url('/src/assets/images/signin_bg.png')",
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
