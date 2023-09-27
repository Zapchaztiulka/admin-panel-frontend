/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    boxShadow: {
      btFocus: "0 0 0 4px rgba(46, 144, 250, 1)", // #2E90FA
      loading: "20px 0 rgba(46, 144, 250, 1)",
    },
    colors: {
      transparent: "transparent",
      //background
      bgD: "#FFFFFF",
      bgMainBtD: "#1570EF",
      bgMainBtHover: "#1849A9",
      bgMainBtPressed: "#53B1FD",
      bgDisable: "#F9F9F9",
      bgInputHover: "#EFF8FF",
      // icon
      bgIcon: "#C4C4C4",
      iconPrimary: "#2E3238",
      iconSecondary: "#888D92",

      // border
      borderD: "#C6CACD",
      borderA: "#175CD3",
      border: "rgba(0, 0, 0, 0.20)",
      // text
      textSecondary: "#41464C",
      textContrast: "#FFFFFF",
      textError: "#D92D20",
      textDisabled: "#A7ABB0",
      textInputA: "#1C1F23",
      textInputD: "#6B7075",
      green: "#039855",
    },
    screens: {
      mobile375: "375px",
      mobile480: "480px",
      tablet600: "600px",
      tablet768: "768px",
      tablet1024: "1024px",
      desktop1200: "1200px",
      desktop1400: "1400px",
    },
  },
  plugins: [],
};

// D -default
// A - active
