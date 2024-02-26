import { Given, When, Then } from '@wdio/cucumber-framework';
import homePage from '../page-objects/home.page.js';
import menuPage from '../page-objects/menu.page.js';
import { randomNumber } from '../utils/utils.js';

Given('I am on the home page', async function () {
    await homePage.open();
});

When('I select {word} menu item', async function(menuItem) {
    (await menuPage.selectMenuItem(menuItem)).click();
});

When('I select any catalog menu item', async function() {
    const amountOfCatalogMenuItems = await menuPage.menuItems.length;
    let randomInt = randomNumber(0, amountOfCatalogMenuItems - 2);
    await menuPage.menuItems[randomInt].click();
});