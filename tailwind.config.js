/** @type {import('tailwindcss').Config} */
export default {
  presets: [
    // eslint-disable-next-line no-undef
    require('universal-components-frontend/tailwind.config.js')
  ],
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
};