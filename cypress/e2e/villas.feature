Feature: Verify the total displayed number of results for Villas with a price range of more than or equal to 300,000 AED / yearly

  Scenario: Check if the total displayed number of results matches the API response for Villas with the specified price range
    Given I visit the Property Finder.bh
    When I select Villas under the property type
    And I go to the Villas list Filter Price range max 300000
    Then I check if the total number of results from the API response matches the total displayed property results




