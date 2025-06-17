/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      container: {
        padding: "15px",
        center: true,
        screens: {
          sm: "576px",
          md: "768px",
          lg: "992px",
          xl: "1200px",
          "2xl": "1400px"
        },
      },

      colors: {
        "primary-color": "#FF1E1E",
        "main-color": "#D30000",
        "secondary-color": "#0B0B0B",
        "dark-gray": "#A1A1A1",
      },
    },
  },
  plugins: [],
}

