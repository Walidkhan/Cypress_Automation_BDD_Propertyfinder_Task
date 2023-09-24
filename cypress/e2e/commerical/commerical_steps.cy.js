import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
var commericalPage = require('../../support/Page_Object_Model/commericalClass')

Given('I am on the PropertyFinder.bh website', () => {
   cy.visit('/')
   cy.url().should('eq','https://www.propertyfinder.bh/')
});

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

