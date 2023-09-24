/// <reference types="cypress"/>
var SearchPropertPage = function () {
    // Locaters 
    this.searchInputField = 'input[data-testid="input"]'
    this.SearchIcon = '.filter-form-component-variant__row-3 > .filter-form-component-variant__m-hide'
    this.firstProprtyButton = '[data-testid="gallery-picture-container"]'
    this.availablefromDate = ':nth-child(5) > .property-facts__value'
    this.searchTheText = function () {
        cy.get(this.searchInputField).eq(0).should('have.attr', 'placeholder', 'Region or Area or Community').as('SearchInput')
        cy.get('@SearchInput').type('Bahrain Bay').should('have.value', 'Bahrain Bay')
    }

    this.click_First_SerachLocation = function () {
        cy.get('.multi-selection-autocomplete__suggestion-text').click({ force: true }) // first location search 
    }
    this.clickSearchIcon = function () {
        cy.get(this.SearchIcon).should('have.css', 'color').and('eq', 'rgb(255, 255, 255)').as('searchIcon') // search icon
        cy.get(this.SearchIcon).eq(0).click({ force: true })
    }
    this.click_FirstProperty = function () {
        cy.get(this.firstProprtyButton, { timeout: 60000 }).first().click({ force: true })
    }
    this.verify_AvailablefromDateShouldNot_Emtpy = function () {
        cy.get(this.availablefromDate).should('not.be.empty')
    }
}

module.exports = new SearchPropertPage();  