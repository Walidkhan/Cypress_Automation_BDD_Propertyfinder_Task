const cucumber = require('cypress-cucumber-preprocessor').default 
const { defineConfig } = require("cypress");

module.exports = defineConfig({
 
  e2e: {
    baseUrl: 'https://www.propertyfinder.bh/',
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber()) 
    },
    //testIsolation: false,
    specPattern: "cypress/e2e/*.feature",
    viewportWidth: 1280,
    viewportHeight: 768, 
  },
});
