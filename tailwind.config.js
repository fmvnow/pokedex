module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        inherit: "inherit",
        current: "currentColor",
        transparent: "transparent",
        black: "#000",
        white: "#fff",
        neutral: {
          50: "rgb(var(--primary-50) / <alpha-value>)",
        },
        primary: {
          50: 'rgb(var(--primary-50) / <alpha-value>)',
        }
      },
      backgroundColor: {},
      borderColor: {},
      boxShadowColor: {},
    }
  }
}
