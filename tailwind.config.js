/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    colors: {
      //Background
      bgBtPrimary: "#0165FC",
    },
    screens: {
      tablet: "600px",
      desktop: "1200px",
    },
  },
  plugins: [],
};
