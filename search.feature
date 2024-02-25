Feature: Login

  @login
  Scenario: User can log in using valid credentials
    Given I am on the home page
    And I am not logged in
    When I click on the Sign In button in the header
    And I enter "new_email@gmail.com" into email input field
    And I enter "winterschool2024!" into passwd input field
    And I click the Sign In button
    Then I see in the header "Natallia Newcomer"

# Test Case 2
# Users should be able to search a product using the search box at the top of the page. For
# example, searching for "Blouse" should only find results containing text "Blouse"