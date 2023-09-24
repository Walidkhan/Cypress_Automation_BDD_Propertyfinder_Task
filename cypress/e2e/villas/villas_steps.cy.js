import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
var villasPage = require('../../support/Page_Object_Model/villasClass')
Given('I visit the Property Finder.bh', () => {
  cy.viewport(1280, 768);
  cy.visit('/');  // here / define base_URL and its added in cypress.config.js file
  cy.url().should('eq', 'https://www.propertyfinder.bh/') // verifying page url should navigate to correct domain.

});

When('I select Villas under the property type', () => {
  villasPage.selectVillasUnderPropertyType()
});

And('I go to the Villas list Filter Price range max 300000', () => {
  villasPage.verify_Villa_filterPriceRange()
});

 Then('I check if the total number of results from the API response matches the total displayed property results', () => {
  villasPage.getTotlaNumberOfPropertiesFrom_API()
 });
