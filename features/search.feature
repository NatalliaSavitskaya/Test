Feature: Searching by keyword

  @search
  Scenario: Unregistered user can search for an approprite product based on entered keyword
    Given I am on the home page
    And I am not logged in
    When I fill in Printed in the search box
    And I click on the Loupe button
    Then I see the search results
    And Each result contains entered keyword in each title
