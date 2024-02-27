Feature: Logout

  @logout
  Scenario: Logged in user can log out
    Given I am on the home page
    And I am logged in as Natallia
    When I click on the Sign Out button in the header
    Then I am on the sign in page