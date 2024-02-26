Feature: Making an order

@order
    Scenario: Unregistered user can't make an order without creating an account
        Given I am on the home page
        And I am not logged in
        When I add 1 product to my cart
        And I am on my shopping cart page
        And A correct order information is displayed
        And I click the Proceed to Checkout button
        Then I am on the sign in page

# Test Case 1
# When an unregistered user tries to proceed with checkout after ordering some item, the page
# should ask to create an account or sign in first, before letting the user finish the order.

@add_and_remove_several_products
Scenario: Logged in user can add several products to the cart and remove all of them
    Given I am on the home page
    And I am logged in as Natallia
    When I add 3 products to my cart
    And I remove all products from the cart
    Then The counter displays that the cart is empty