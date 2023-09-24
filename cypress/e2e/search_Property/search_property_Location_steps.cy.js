import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
var SearchPropertPage = require('../../support/Page_Object_Model/searchProprtyClass')

Given('I am on the Property Finder.bh', () => {
    cy.viewport(1280, 768);
    cy.visit('/')
    cy.url().should('eq','https://www.propertyfinder.bh/')
  });
  
  When('I search for {string} location', (location) => {
    SearchPropertPage.searchTheText()
  });
  
  And('I select the first location from the search results', () => {
    SearchPropertPage.click_First_SerachLocation()
  });
  
  And('I click on the search icon', () => {
    SearchPropertPage.clickSearchIcon()
  });
  
  Then('I select the first property from the list', () => {
    SearchPropertPage.click_FirstProperty()
  });
  
  And('I verify that the "Available from date" is not empty', () => {
    SearchPropertPage.verify_AvailablefromDateShouldNot_Emtpy()
  });
  