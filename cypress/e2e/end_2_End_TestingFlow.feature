Feature: Verify Property finder website E2E Testing flow

Background:
Given I visit the Property Finder.bh

  Scenario: Click on commercial properties only checkbox and select "offices"
    Given I visit the Property Finder.bh
    When I select the "show commercial properties only" checkbox and click on the search icon
    And I click on the "offices" category in the commercial properties list
    Then I check if the total number of results from the API response matches the total displayed property results for commerical properties
    And I verify the details of the first property in the searched result from the API response like price, description, location, size, title, and bathrooms

  Scenario: Check the total displayed number of results for category Villas with price range
   more than or equal to 300,000 AED / yearlye
    Given I visit the Property Finder.bh
    When I select Villas under the property type
    And I go to the Villas list Filter Price range max 300000
    Then I check if the total number of results from the API response matches the total displayed property results

    Scenario: Search for property by location
    Given I visit the Property Finder.bh
    When I search for "The Bahrain Bay" location
    And I select the first location from the search results
    And I click on the search icon
    Then I select the first property from the list
    And I verify that the "Available from date" is not empty
