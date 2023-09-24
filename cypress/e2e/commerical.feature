Feature: PropertyFinder.bh - Commercial Properties Search

  Scenario: Click on commercial properties only checkbox and select "offices"
    Given I am on the PropertyFinder.bh website
    When I select the "show commercial properties only" checkbox and click on the search icon
    And I click on the "offices" category in the commercial properties list
    Then I check if the total number of results from the API response matches the total displayed property results for commerical properties
    And I verify the details of the first property in the searched result from the API response like price, description, location, size, title, and bathrooms
