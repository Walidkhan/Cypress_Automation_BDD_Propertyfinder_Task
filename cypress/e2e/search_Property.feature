Feature: Property Search
  As a user
  I want to search for a property by location
  So that I can find available properties in a specific area

  Scenario: Search for property by location
    Given I am on the Property Finder.bh
    When I search for "The Bahrain Bay" location
    And I select the first location from the search results
    And I click on the search icon
    Then I select the first property from the list
    And I verify that the "Available from date" is not empty
