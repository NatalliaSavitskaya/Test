import { Given, When, Then } from '@wdio/cucumber-framework';
import searchPage from '../page-objects/search.page.js';

When('I fill in {word} in the search box', async function (keyword) {
    await searchPage.searchInputField.setValue(keyword);
    this.keyWord = keyword;
});

When('I click on the Loupe button', async function () {
    await searchPage.searchLoupeButton.click();
});

Then('I see the search results', async function () {
    if ((await searchPage.searchResults.length) > 0) {
        await expect(await searchPage.searchResults).toBeElementsArrayOfSize({ gte: 1 });
    } else {
        await expect(await searchPage.searchResultMessage)
            .toHaveText(expect.stringContaining(`0 results have been found`));
    }
});

Then('Each result contains entered keyword in each title', async function () {
    // REVIEW:
    // Be careful with using $$() without waiting. 
    // If page loads slower, `searchPage.searchResults` will be an empty array.
    for (let i = 0; i < (await searchPage.searchResults.length); i++) {
        const textProductAttribute = await searchPage.searchResults[i].getText();
        // REVIEW: It's preferred to use built-in assertion library "expect"
        // Because it will show a better message than a custom thrown error
        if (!textProductAttribute.toLowerCase().includes(this.keyWord.toLowerCase())) {
            throw `ERROR: The search results are invalid!`;
        }
    }
});