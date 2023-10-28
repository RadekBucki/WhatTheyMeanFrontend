/** @type {(tailwindConfig: object) => object} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'dark-blue': '#151E3F',
      'teal': '#2EC4B6',
      'bright-pink': '#FF3366',
      'off-white': '#F6F7F8',
      'selected-blue': '#030027',
      'yt': '#FF0000',
      'yt-text': '#282828',
      'audio': '#2EC4B6',
      'audio-text': '#151E3F'
    },
    extend: {
      width: {
        'custom': 'calc(100vw - 320px)',
      },
    },
  },
  plugins: [],
});

