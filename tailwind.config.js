/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    // fontFamily: {
    //   inter: ["Inter", "sans-serif"],
    // },
    extend: {},
    boxShadow: {
      btFocus: "0 0 0 4px rgba(46, 144, 250, 1)", // #2E90FA
    },
    colors: {
      //background
      // bgMainBtD: "#0165FC",
      bgMainBtD: "#1570EF",
      transparent: "#FFFFFF",
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
      tablet: "600px",
      desktop: "1200px",
    },
  },
  plugins: [],
};

// D -default
// A - active
