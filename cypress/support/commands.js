Cypress.Commands.add('getApiData', () => {
    // Clear local storage and cookies (if needed)
    cy.clearLocalStorage();
    cy.clearCookies();
  
    // Make the API request and alias it
    cy.request("GET", "/_next/data/uYI1dhwoXpcJ8tiQv-m5K/en/search.json?c=3&t=4&fu=0&ob=mr").as('apiData');
  });
  Cypress.Commands.add('getApiDataTotalPropertiesVillas', () => {
    // Clear local storage and cookies (if needed)
    cy.clearLocalStorage();
    cy.clearCookies();
  
    // Make the API request and alias it
    cy.request("GET", "/_next/data/uYI1dhwoXpcJ8tiQv-m5K/en/search.json?c=1&t=35&pt=30000&fu=0&ob=mr").as('getVillasProeprtyCount');
  });

  