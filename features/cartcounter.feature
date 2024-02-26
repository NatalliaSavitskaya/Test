Feature: Displaying the correct number of items in the cart box

@cartcounter @adding
  Scenario: Adding one product to an empty cart by unregistered user
    Given I am on the home page
    When I am not logged in
    And I add 1 product to my cart
    Then The counter on the cart is increased by 1

# Test Case 3
# The cart should correctly show the number of items. When a user adds one product to a cart,
# the counter on the cart should increase by 1.

@cartcounter @removing
  Scenario: Removing one product from non-empty cart by unregistered user
    Given I am on the home page
    When I am not logged in
    And I add 1 product to my cart
    And I am on my shopping cart page
    And I remove 1 item from my cart
    Then The counter displays that the cart is empty

# Test Case 4
# Similarly, when there is 1 item in the cart, if the user removes an item from the cart, it now
# should display that there are no items anymore.