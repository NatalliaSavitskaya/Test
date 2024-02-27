Feature: Making an order

  Background: 
    Given I am on the home page

  @order
  Scenario: An unregistered user can't proceed with checkout after ordering some item without creating an account or signing in first
    Given I am not logged in
    When I add 1 product to my cart
    And I am on my shopping cart page
    And A correct order information is displayed
    And I click the Proceed to Checkout button
    Then I am on the sign in page

  @several
  Scenario: Logged in user can add several products to the cart and remove all of them
    Given I am logged in as Natallia
    When I add 2 products to my cart
    And I remove all products from the cart
    Then The counter displays that the cart is empty
