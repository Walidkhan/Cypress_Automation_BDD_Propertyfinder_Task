import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

var villasPage = require('../../support/Page_Object_Model/villasClass')
var commericalPage = require('../../support/Page_Object_Model/commericalClass')
var SearchPropertPage = require('../../support/Page_Object_Model/searchProprtyClass')
Given('I visit the Property Finder.bh', () => {
  cy.visit('/');  // here / define base_URL and its added in cypress.config.js file
  cy.url().should('eq', 'https://www.propertyfinder.bh/') // verifying page url should navigate to correct domain.
});
 //commerical
 When('I select the {string} checkbox and click on the search icon', () => {
  commericalPage.verify_CommericalCheckedBoxAndSearchIcon()
});

When('I click on the {string} category in the commercial properties list', () => {
  commericalPage.verify_OfficesCategory()
});

Then('I check if the total number of results from the API response matches the total displayed property results for commerical properties', () => {
  commericalPage.getTotalProperties_ResultFromAPI()
});

Then('I verify the details of the first property in the searched result from the API response like price, description, location, size, title, and bathrooms', () => {
  commericalPage.verify_RoomDetailsFromAPI_Response()
});
  
   // villas
When('I select Villas under the property type', () => {
  villasPage.selectVillasUnderPropertyType()
});

And('I go to the Villas list Filter Price range max 300000', () => {
  villasPage.verify_Villa_filterPriceRange()
});

Then('I check if the total number of results from the API response matches the total displayed property results', () => {
  villasPage.getTotlaNumberOfPropertiesFrom_API()
 });

 // search property
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