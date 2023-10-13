/** @type {import('tailwindcss').Config} */
import {theme} from "universal-components-frontend/presets"
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme,
  plugins: [],
  
};