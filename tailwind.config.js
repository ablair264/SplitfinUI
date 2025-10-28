const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#79d5e9',
        secondary: '#5ababe',
        dark: '#191e29',
        accent: '#75d0e5',
      },
      backgroundColor: {
        'primary': '#79d5e9',
        'secondary': '#5ababe', 
        'dark': '#191e29',
      },
      borderColor: {
        'primary': '#79d5e9',
        'dark': '#191e29',
      }
    },
  },
  plugins: [],
});