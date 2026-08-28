/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: "#6366f1",
          hover: "#4f46e5",
          dark: "#818cf8",
          darkhover: "#a5b4fc",
        },
        positive: {
          DEFAULT: "#16a34a",
          dark: "#4ade80",
        },
        negative: {
          DEFAULT: "#dc2626",
          dark: "#f87171",
        },
      },
    },
  },
  plugins: [],
};
