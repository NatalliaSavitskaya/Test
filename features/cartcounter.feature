Feature: Displaying the correct number of items in the cart

@cartcounter @cartcounter_adding
  Scenario: Adding one product to an empty cart by non-authorized user
    Given I am on the home page
    And I am logged in as Natallia
    When I select Dresses menu item
    And I add 1 product to my cart
    Then The counter on the cart is increased by 1

# Test Case 3
# The cart should correctly show the number of items. When a user adds one product to a cart,
# the counter on the cart should increase by 1.

@cartcounter @cartcounter_removing
  Scenario: Removing one product from non-empty cart by authorized user
    Given I am on the home page
    And I am not logged in
    When I select Dresses menu item
    And I add 1 product to my cart
    And I remove 1 item from my cart
    Then The counter displays that the cart is empty

# Test Case 4
# Similarly, when there is 1 item in the cart, if the user removes an item from the cart, it now
# should display that there are no items anymore.