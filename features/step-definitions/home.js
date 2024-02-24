import { Given, When, Then } from '@wdio/cucumber-framework';
import homePage from '../page-objects/home.page.js';

Given('I am on the home page', async function () {
    await homePage.open();
});




