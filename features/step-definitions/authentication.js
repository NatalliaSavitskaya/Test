import { Given, When, Then } from '@wdio/cucumber-framework';
import signInPage from '../page-objects/signin.page.js';
import homePage from '../page-objects/home.page.js';
import headerPage from '../page-objects/header.page.js';
import { users } from '../test-data/users.js';
import AllureReporter from '@wdio/allure-reporter';

Given('I am logged in as {word}', async function (name) {
    if (!Object.keys(users).includes(name)) {
        throw Error(`User ${name} is not recognized`);
    }

    const user = users[name];
    AllureReporter.addArgument('user', user);

    await headerPage.signInButton.click();
    await signInPage.input("email").setValue(user.email);
    await signInPage.input("passwd").setValue(user.password);
    await signInPage.signInButton.click();
    await expect(await headerPage.userFirstAndLastName)
        .toHaveText(expect.stringContaining(`${user.firstname} ${user.lastname}`));
});

Given('I am not logged in', async function () {
    if (await headerPage.signInButton.isDisplayed()) {
        return true;
    } else {
        await headerPage.signOutButton.click();
        homePage.open();
    }
});

When('I click on the Sign In button in the header', async function () {
    await headerPage.signInButton.click();
});

When('I enter {string} into {word} input field', async function (text, inputTitle) {
    await signInPage.input(inputTitle).setValue(text);
});

When('I click the Sign In button', async function () {
    await signInPage.signInButton.click();
});

Then('I see in the header {string}', async function (userName) {
    await expect(headerPage.userFirstAndLastName)
        .toHaveText(expect.stringContaining(userName));
});

When('I click on the Sign Out button in the header', async function () {
    await headerPage.signOutButton.click();
});

Then('I am on the sign in page', async function () {
    await expect(await signInPage.pageTitle)
        .toHaveText(expect.stringContaining('AUTHENTICATION'));
    await expect(await signInPage.createAnAccountSubtitle)
        .toHaveText(expect.stringContaining('CREATE AN ACCOUNT'));
});