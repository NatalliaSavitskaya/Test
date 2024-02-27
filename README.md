# TDL WinterSchool Final practical task
This project is created for testing the website: http://www.automationpractice.pl/

For running tests Google Chrome, Node.js, Java, Visual Studio Code WebdriverIO with Cucumber expension need to be installed.

## How to download code from GitHub account
1. Create a folder on local PC.
2. Run commandline (Win+R->"cmd"), go to the created directory with a command:
```
cd path\to\the\project\folder
```
3. Export all the code from this remote repository with the command:
```
git clone git@github.com:NatalliaSavitskaya/Testing_automationpractice.pl.git
```
4. Go to the specific commit if needed:
```
git checkout <commit-hash>
```
## How to run the tests from the project
1. Go to the project folder with the command:
```
cd path\to\the\project\folder\Testing_automationpractice.pl
```
2. Open the project in Visual Studio Code with the command:
```
code .
```
3. Install dependencies by the command:
```
npm install
```
4. Run all the test cases one by one by with the command:
```
npm run wdio
```
## How to run tests with a specific tag
To run the test suits based on some specific tag "@tag" run the command:
```
npm run wdio -- --cucumberOpts.tagExpression "@tag"
```
You may use the short version of this command:
```
npm run tag -- "@my-tag"
```
## How to view test result report
1. Delete allure-results folder from your project directory (if it was created).
2. Run the tests.
3. For generating test result report run the command:
```
npm run allure
```
4. HTML document is opened in default browser for viewing.
## Which test cases are automated
### Test Case 1
When an unregistered user tries to proceed with checkout after ordering some item, the page should ask to create an account or sign in first, before letting the user finish the order.

To run this test case run the command:
```
npm run tag -- "@order"
```
### Test Case 2
Users should be able to search a product using the search box at the top of the page. For example, searching for "Blouse" should only find results containing text "Blouse".

To run this test case run the command:
```
npm run tag -- "@search"
```
### Test Case 3
The cart should correctly show the number of items. When a user adds one product to a cart, the counter on the cart should increase by 1.


To run this test case run the command:
```
npm run tag -- "@adding"
```
### Test Case 4
When there is 1 item in the cart, if the user removes an item from the cart, it now should display that there are no items anymore

To run this test case run the command:
```
npm run tag -- "@removing"
```
### Additional test cases
Also implemented test cases for signing in, signing out registered user, adding a certain amount of the products to the card and removing all of them from the cart. 

To run these test cases, run one of the appropriate commands:
```
npm run tag -- "@login"
npm run tag -- "@logout"
npm run tag -- "@several"
```
The selection of a catalog menu item and a product within it is implemented randomly. The combination of color and size values is selected first for which the product is in stock.