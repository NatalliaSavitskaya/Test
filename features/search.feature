Feature: Searching by keyword

  @search
  Scenario: An unregistered user can search for a product using the entered keyword
  // The keyword is searched only as part of the product title

    Given I am on the home page
    And I am not logged in
    When I fill in Printed in the search box
    And I click on the Loupe button
    Then I see the search results
    And Each result contains entered keyword in each title
