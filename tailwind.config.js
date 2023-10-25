/** @type {import('tailwindcss').Config} */
import { myPreset } from "./presets";
// import myPreset from "universal-components-frontend/preset";

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [myPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};
