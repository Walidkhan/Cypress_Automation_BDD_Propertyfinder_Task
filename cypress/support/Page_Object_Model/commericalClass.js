/// <reference types="cypress"/>
var commericalPage = function () {
  var apiTotalPropertiesFromAPI = "";
  var apiTotalBathroomsfrom_API = "";
  var apiDescriptionfrom_API = "";
  var apiCurrencyType_fromAPI = "";
  var apiRoomPrice = "";
  var apiTitle = "";
  var apiSizeUnit = "";
  var apiLocation = "";
  var apiSizeValue = "";
  var apiAvaibleFrom_date = ""

  // locaters
  this.firstProprtyButton = '[data-testid="gallery-picture-container"]'
  this.TotalBathroomLabel = ':nth-child(3) > .property-facts__value'
  this.roomTitleLabel = '.text--size6'
  this.roomPriceLabel = '.text > .property-price > .property-price__price'
  this.descriptionLabel = '.text-trim'
  this.commericalCheckedBox = '.checkbox-component__label'
  this.searchIcon = '.filter-form-component-variant__row-3 > .filter-form-component-variant__m-hide'
  this.officeLabel = ':nth-child(3) > .link-module_link__TaDrq > .styles_desktop_aggregation-links__name__FYyNZ'
  this.roomSize = '.property-facts__value > :nth-child(2)'
  this.locationLabel = '.property-location__detail-area'
  this.totalProperitesDisplaylabel = '.styles_container__KcjEg > span'
 // Locaters End

// this function will click on Show commercial properties only checked box and search icon
  this.verify_CommericalCheckedBoxAndSearchIcon = function () {
    cy.get(this.commericalCheckedBox).should('have.text', 'Show commercial properties only').click()
    cy.get(this.searchIcon).click({force: true}) // search icon
  }
  this.verify_OfficesCategory = function () {
    cy.get(this.officeLabel).should('have.text', 'Offices')
    cy.get(this.officeLabel).should('have.text', 'Offices').click({ force: true })
  }
  this.getTotalProperties_ResultFromAPI = function () {
    cy.request("GET", "/_next/data/uYI1dhwoXpcJ8tiQv-m5K/en/search.json?c=3&t=4&fu=0&ob=mr").then((getApiData) => {
      debugger
      apiTotalPropertiesFromAPI = getApiData.body.pageProps.searchResult.meta.total_count;
      apiTotalBathroomsfrom_API = getApiData.body.pageProps.searchResult.properties[0].bathrooms;
      apiDescriptionfrom_API = getApiData.body.pageProps.searchResult.properties[0].description;
      apiCurrencyType_fromAPI = getApiData.body.pageProps.searchResult.properties[0].price.currency;
      apiRoomPrice = getApiData.body.pageProps.searchResult.properties[0].price.value.toLocaleString();
      apiTitle = getApiData.body.pageProps.searchResult.properties[0].title;
      apiSizeUnit = getApiData.body.pageProps.searchResult.properties[0].size.unit;
      apiLocation = getApiData.body.pageProps.searchResult.properties[0].location.full_name;
      apiSizeValue = getApiData.body.pageProps.searchResult.properties[0].size.value; 
      apiAvaibleFrom_date = getApiData.body.pageProps.searchResult.properties[0].listed_date;
        
      cy.get(this.totalProperitesDisplaylabel, { timeout: 60000 }).should('contain', 'properties')
     // geting Total property label text from web page and find integer value  to compare with API response
      cy.get(this.totalProperitesDisplaylabel).then(getTotalPropertytextFromPage => { 
        if (getTotalPropertytextFromPage.length > 0) { // getting all label to find integer value
          const match = getTotalPropertytextFromPage[0].innerText.match(/\d+/); // Match one or more digits in the text
          if (match) {
            const totalDisplayedProperty = parseInt(match[0], 10);
            console.log(totalDisplayedProperty);
             expect(apiTotalPropertiesFromAPI).eq(totalDisplayedProperty); // verify Total number properties from API with web Page
          } else {
            console.log("No number found in the string.");
          }
        }
      });
    })
  }
  this.verify_RoomDetailsFromAPI_Response = function () {
    cy.get(this.firstProprtyButton).first().click({force: true})  // click on first propert in offices list
    cy.get(this.roomPriceLabel).should('have.text', apiRoomPrice + ' ' + apiCurrencyType_fromAPI + ' ') // verify Price
    //cy.get(this.descriptionLabel).should('contain',apiDescriptionfrom_API) // verify description 
    cy.log('Location' + apiLocation)
    apiLocation.split(', ');
    const convertedText = apiLocation.replace(/(.+), (.+), (.+)/, '$1$3, $2');
    cy.get(this.locationLabel).should('contain',convertedText)
   cy.get(this.roomSize)
  .invoke('text') // Get the text of the element
  .then((text) => {
    // Clean up the text by removing newline characters and extra whitespace
    const PageText = text.replace(/\n|\t/g, '').trim();
    const formattedText = PageText.replace(/(\d)(sqm)/i, '$1 $2'); // adding some space
    // Now make the assertion with the cleaned text
     expect(formattedText).to.equal(apiSizeValue+" "+apiSizeUnit); // verify Room Size
  });
    cy.get(this.roomTitleLabel).should('have.text', apiTitle)
    cy.get(this.TotalBathroomLabel).should('have.text', apiTotalBathroomsfrom_API) //   bathrooms
  }
}

module.exports = new commericalPage();  