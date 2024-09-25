/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "jet-brains-mono": ["JetBrains Mono", "sans-serif"],
      },
      colors: {
        primary: "#010409",
        secondary: "#0d1117",
        tertiary: "#151b23",
        quaternary: "#e5e7eb",
        border: "#2f353d",
      },
      keyframes: {
        "caret-blink": {
          "0%, 70%, 100%": { opacity: 1 },
          "20%, 50%": { opacity: 0 },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
