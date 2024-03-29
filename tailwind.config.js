module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./auth/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'screen-xs': { 'max': '480px' },
        'screen-xssm': { 'max': '640px' },
        'screen-sm': { 'max': '800px' },
        'screen-md': { 'max': '1024px' },
        'screen-lg': { 'max': '1280px' },
        'screen-xl': { 'max': '1440px' },
        'screen-l-sm': { 'min': '800px' },
        'screen-l-md': { 'min': '1024px' },
        'screen-l-lg': { 'min': '1280px' },
        'screen-l-xl': { 'min': '1440px' },
      },
      colors: {
        'primary': '#4595d0',
        'secondary': '#000',
        'success': '#4caf50',
        'info': '#2196f3',
        'warning': '#ffeb3b',
        'danger': '#f44336',
        'dark': '#212121',
        'light': '#eff3f4',
        'dimGray': '#6e6e6e',
        'lightGray': '#c0c0c0',
        'darkText': "rgb(156 163 175)",
        'darkMode': '#18191a',
        'darkModeBg': '#273340',
        'darkModeBgHover': '#d9d9d9',
        'borderDarkMode': '#232c31',
        'link': '#4595d0',
        'salmon': '#ed6969',
        'deeppink': '#f91880',
      },
      boxShadow: {
        'profileCardHover': '0 0 10px 1px rgb(255 255 255 / 0.1), 0 0 0 0 rgb(255 255 255 / 0.1)',
      }
    },
  },
  plugins: [],
}
