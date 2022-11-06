/* eslint-disable no-console */
const styleDictionary = require("style-dictionary");
const global = require("../assets/tokens/ref.json");
const light = require("../assets/tokens/sys.json");
const dark = require("../assets/tokens/dark.json");

const supportedTokenTypeList = ["color", "sizing"];

/**
 * Converts color token from hexadecimal to RGB format
 */
const getRGB = (value) =>
  parseInt(value.substring(1, 3), 16) +
  " " +
  parseInt(value.substring(3, 5), 16) +
  " " +
  parseInt(value.substring(5, 7), 16);

/**
 * Custom format that handle reference in css variables
 */
styleDictionary.registerFormat({
  name: "css/variables",
  formatter({ dictionary, file }) {
    console.log("dictionary.allProperties", dictionary.allProperties);
    return `${this.selectorName} {
${dictionary.allProperties
  .map((token) => {
    if (token.type !== "color") return;
    console.log("token", token.path);

    value = getRGB(token.value);

    if (dictionary.usesReference(token.original.value)) {
      const reference = dictionary.getReferences(token.original.value);
      const referenceName = reference[0].path.join("-");
      return `  --${token.path.join("-")}: var(--${referenceName});\n`;
    }
    if (file.destination === "global-variables.css") {
      return `  --${token.path.join("-")}: ${value};\n`;
    }
  })
  .join("")}
}`;
  },
});

/**
 * Custom format that generate tailwind color config based on css variables
 */
styleDictionary.registerFormat({
  name: "tw/css-variables",
  formatter({ dictionary }) {
    return (
      "module.exports = " +
      `{\n${dictionary.allProperties
        .map((token) => {
          return `  "${token.path
            .slice(2)
            .join("-")}": "rgb(var(--${token.path.join(
            "-"
          )}) / <alpha-value>);"`;
        })
        .join(",\n")}\n}`
    );
  },
});

styleDictionary.registerFormat({
  name: "tw/variables",
  formatter({ dictionary }) {
    return (
      "module.exports = " +
      `{\n${dictionary.allProperties
        .map((token) => {
          return `"${token.path[2]}": "${token.value}"`;
        })
        .join(",\n")}\n}`
    );
  },
});

/**
 * Returns the files configuration
 * for generating seperated tailwind files.
 */
function getConfigTailwindFilesByType(typeList) {
  return typeList.map((typeName) => {
    return {
      destination: `../tailwind-extend/${typeName}.js`,
      format: `tw/${typeName === "color" ? "css-variables" : "variables"}`,
      filter: {
        type: typeName,
      },
    };
  });
}

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(tokensConfig = {}) {
  const { brand, buildTailwindFiles, tokens, selectorName } = tokensConfig;

  let configTailwindFilesByType = [];

  if (buildTailwindFiles) {
    configTailwindFilesByType = getConfigTailwindFilesByType(
      supportedTokenTypeList
    );
  }

  return {
    tokens,
    platforms: {
      web: {
        transformGroup: "web",
        prefix: "",
        buildPath: "./assets/css/",
        files: [
          {
            destination: `${brand}-variables.css`,
            format: "css/variables",
            selectorName,
          },
          ...configTailwindFilesByType,
        ],
      },
    },
  };
}

console.log("Build started...");

const configs = [
  // PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS
  {
    brand: "global",
    buildTailwindFiles: false,
    selectorName: ":root",
    tokens: global,
  },
  {
    brand: "dark",
    buildTailwindFiles: false,
    selectorName: ".dark",
    tokens: dark,
  },
  {
    brand: "light",
    buildTailwindFiles: true,
    selectorName: ":root",
    tokens: light,
  },
];

configs.map((config) => {
  console.log("\n==============================================");
  console.log(`\nProcessing:  [Web] [${config.brand}]`);

  const StyleDictionary = styleDictionary.extend(
    getStyleDictionaryConfig(config)
  );

  StyleDictionary.buildPlatform("web");

  console.log("\nEnd processing");
});

console.log("\n==============================================");
console.log("\nBuild completed!");
