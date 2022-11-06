const colors = require("./assets/tailwind-extend/color");
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      container: {
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "768px",
          xl: "768px",
          "2xl": "768px",
        },
      },
      colors,
    },
  },
};
