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
      bgWhite: "#FFFFFF",
      bgContrast: "#1C1F23",
      bgGreyDark: "#2E3238",
      bgGreyLigth: "#F9F9F9",
      bgBrandDark: "#1570EF",
      bgBrandLight1: "#EFF8FF",
      bgBrandLight2: "#D1E9FF",
      bgBrandLight3: "#2E90FA",
      bgErrorDark: "#FEE4E2",
      bgErrorLight: "#FEF3F2",
      bgSuccessDark: "#D1FADF",
      bgSuccessLight: "#ECFDF3",

      bgWarningDark: "#FEF0C7",
      bgWarningLight: "#FFFAEB",
      bgPressedGrey: "#D1E9FF",
      bgPressedBlue: "#53B1FD",
      bgPressedDestructive: "#F97066",
      bgHover: "#FFFFFF",
      bgHoverGrey: "#EFF8FF",
      bgHoverBlue: "#1849A9",
      bgHoverDestructive: "#912018",
      bgDefaultBlue: "#1570EF",
      bgDefaultDestructive: "#D92D20",
      bgImg: "#F9F9F9",
      bgDisable: "#F9F9F9",

      // icon
      bgIcon: "#C4C4C4", // !!!

      iconPrimary: "#2E3238",
      iconSecondary: "#888D92",
      iconContrast: "#FFFFFF",
      iconBrand: "#1570EF",
      iconError: "#F04438",
      iconSuccess: "#12B76A",
      iconWarning: "#F79009",
      iconDisabled: "#A7ABB0",

      // border
      border: "rgba(0, 0, 0, 0.20)",

      borderDefault: "#C6CACD",
      borderDefaultBlue: "#1570EF",
      borderHover: "#A7ABB0",
      borderHoverBlue: "#1849A9",
      borderPressedBlue: "#53B1FD",
      borderActive: "#175CD3",
      borderError: "#F97066",
      borderSuccess: "#32D583",
      borderDisabled: "#E6E8EA",

      // text
      textPrimary: "#1C1F23",
      textSecondary: "#41464C",
      textTertiary: "#6B7075",
      textContrast: "#FFFFFF",
      textBrand: "#1849A9",
      textInputDefault: "#6B7075",
      textInputActive: "#1C1F23",
      textError: "#D92D20",
      textSuccess: "#039855",
      textWarning: "#F79009",
      textDisabled: "#A7ABB0",
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
