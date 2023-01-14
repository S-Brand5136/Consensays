const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "cypress/integration/**/*.js",
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.js",
    supportFile: false,
  },
});
