/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
      },
      colors: {
        dark: {
          background: "#171717",
          hover: "#4f4635",
          button: "#818cf8",
          card: "#262626",
          text: "#fafafa",
          subtext: "#d4d4d4",
          hover2: "#4f46e5",
          hover3: "#a5b4fc",
          text2: "#312e81",
        },
        light: {
          background: "#ffffff",
          background2: "#f5f5f5",
          button: "#3b49df",
          card: "#ffffff",
          text: "#171717",
          subtext: "#525252",
          hover: "#2f3ab2",
        },
      },
    },
  },
  darkMode: "class", // Ensure this is set
  plugins: [],
};
