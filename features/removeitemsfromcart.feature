Feature: Remove all items from the cart 

  @remove
  Scenario: Logged in user can remove all the items from the cart
    Given I am on the home page
    And I am logged in as Natallia
    When I select Women menu item
    And I mark "In stock" filter
    And I click on any product
    And I select avaliable size and color
    And I click the Add to Card button
    Then I have no items in my cart
    