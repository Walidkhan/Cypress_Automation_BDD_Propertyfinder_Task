/// <reference types="cypress"/>
var villasPage = function () {
  // Locaters 
  this.propertyTypeDrop_down = 'div[class*="dd--filled"]'
  this.propertyTypeDrop_down_OptionsList = '.dropdown-list__item-content'
  this.price_Drop_down = 'Price'
  this.max_Price_InputField = 'input[data-testid="filters-form-range-dropdown-to-input"]'
  this.find_Button = 'button[data-testid="filters-form-btn-find"]'
  this.priceOptionsList = '[data-testid="dropdown-content"]'
  this.searchIcon = '.button-2.filter-form-component-variant__sm-hide'
  this.PriceRangeInputField = ':nth-child(3) > .range-selector__wrapper > .price-selector__input-container > .text-field > .input2 > .input2__input-container > .text-field__input'
  this.totalDisplayedPropertyLabel = '.styles_container__KcjEg > span'
  //end locaters

  //this function take PropertyType dropd-down value and find Villa option to click
  this.selectVillasUnderPropertyType = function () {
    cy.get(this.propertyTypeDrop_down).eq(0).trigger("mouseenter", { scrollBehavior: false }).click()
    cy.wait(1000)
    cy.get(this.propertyTypeDrop_down_OptionsList).each(($el, index, $list) => {
      debugger
      cy.log("option text Values " + index + " " + $el.text())
      if ($el.text() === "Villa") {
        expect($el.text()).eq('Villa')
        $el.click();
        return false;
      }
    })
  }
  this.verify_Villa_filterPriceRange = function () {

    cy.contains(this.price_Drop_down).should('have.text', 'Price').click({ force: true })
    cy.get(this.PriceRangeInputField).click({ force: true })
    cy.wait(1000)
    cy.contains('30,000').click()
    cy.get(this.searchIcon).click()  // search icon to show Villa List
  }

  this.getTotlaNumberOfPropertiesFrom_API = function () {

    cy.get(this.find_Button).click({ force: true }) // Clear cookies
    cy.window().then((win) => {
      win.sessionStorage.clear()
    });
    cy.request("GET", "/_next/data/uYI1dhwoXpcJ8tiQv-m5K/en/search.json?c=1&t=35&pt=30000&fu=0&ob=mr").as('getTotalProperties');
    cy.get('@getTotalProperties').then((getData) => {
      debugger
      var apiTotalCount = getData.body.pageProps.searchResult.meta.total_count;
      cy.log(apiTotalCount)
      cy.get(this.totalDisplayedPropertyLabel, { timeout: 60000 }).should('contain', 'properties')
      // geting Total property label text from web page and find integer value  to compare with API response property result count
      cy.get(this.totalDisplayedPropertyLabel).then(getTotalPropertytextFromPage => {
        // cy.log('Text  :' + getTotalPropertytextFromPage[0].innerText)

        const match = getTotalPropertytextFromPage[0].innerText.match(/\d+/); // Match one or more digits in the text
        if (match) {
          const totalDisplayedProperty = parseInt(match[0], 10);
          console.log(totalDisplayedProperty);
          expect(apiTotalCount).eq(totalDisplayedProperty); // verify Total number properties from API with web Page
        } else {
          console.log("No number found in the string.");
        }

      });
    });
  }
  this.getElementText = function (ele) {
    cy.get(ele).then(text => {
      return text[0].innerText;
    });
  }
}

module.exports = new villasPage();  