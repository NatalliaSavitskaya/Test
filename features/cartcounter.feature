Feature: Displaying the correct number of items in the cart box

  @cartcounter @adding
  Scenario: Adding one product to an empty cart by unregistered user
    Given I am on the home page
    And I am not logged in
    When I add 1 product to my cart
    Then The counter on the cart is increased by 1

  @cartcounter @removing
  Scenario: Removing one product from non-empty cart by unregistered user
    Given I am on the home page
    And I am not logged in
    And I have no products in my cart
    When I add 1 product to my cart
    And I am on my shopping cart page
    And I remove 1 item from my cart
    Then The counter displays that the cart is empty
