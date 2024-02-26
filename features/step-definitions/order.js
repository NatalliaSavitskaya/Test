import { Given, When, Then } from '@wdio/cucumber-framework';
import productsPage from '../page-objects/products.page.js';
import productPage from '../page-objects/product.page.js';
import shoppingcartsummaryPage from '../page-objects/shoppingcartsummary.page.js';
import homePage from '../page-objects/home.page.js';
import headerPage from '../page-objects/header.page.js';
import menuPage from '../page-objects/menu.page.js';
import { parseSize } from '../utils/utils.js';
import { parseColor } from '../utils/utils.js';
import { randomNumber } from '../utils/utils.js';

When('I mark "In stock" filter', async function () {
    await productsPage.inStockFilter.click();
});

When('I click on any product', async function () {
    const lastNumber = await productsPage.allProductImages.length;
    let randomInt = randomNumber(0, lastNumber - 1);
    await productsPage.allProductImages[randomInt].click();
});

When('I select avaliable size and color', async function () {
    let avaliability = await productPage.availabilityValue.getText();
    let foundInStock = false;
    await browser.pause(1000);
    for (let i = 0; i < await productPage.productColor.length; i++) {
        await productPage.productColor[i].click();
        await browser.pause(1000);
        for (let j = 0; j < await productPage.productSizeOptions.length; j++) {
            await productPage.productSizeSelector.selectByIndex(j);
            await browser.pause(1000);
            avaliability = await productPage.availabilityValue.getText();
            if (avaliability == 'In stock') {
                this.productTitle = await productPage.productTitle.getText();
                this.productSize = await productPage.productSizeOptions[j].getAttribute('title');
                this.productColor = await productPage.productColor[i].getAttribute('name');
                this.productAmount = await productPage.productQuantity.getAttribute('value');
                this.productPrice = await productPage.productLastPrice.getText();
                this.productDiscount = await productPage.productReductionPercent.getText();
                foundInStock = true;
                break;
            }
        }
        if (foundInStock) {
            break;
        }
    }
});

When('I click the Add to Card button', async function () {
    await productPage.addToCartButton.click();
});

When('I click the Proceed to Checkout button on the pop-up window of the product page', async function () {
    await browser.pause(2000);
    await productPage.proceedToCheckoutButtonPopup.click();
});

When('A correct order information is displayed', async function () {
    await expect(await shoppingcartsummaryPage.firstProductName)
        .toHaveText(this.productTitle);

    await expect(await shoppingcartsummaryPage.firstProductSizeAndColor)
        .toHaveText(expect.stringContaining(this.productColor));

    await expect(await shoppingcartsummaryPage.firstProductSizeAndColor)
        .toHaveText(expect.stringContaining(this.productSize));

    const firstproductSizeAndColor = await shoppingcartsummaryPage.firstProductSizeAndColor.getText();
    const size = parseSize(firstproductSizeAndColor);
    const color = parseColor(firstproductSizeAndColor);
    if (!size == this.productSize) {
        throw `ERROR: The size is incorrect!`;
    }
    if (!color == this.productColor) {
        throw `ERROR: The color is incorrect!`;
    }

    await expect(await shoppingcartsummaryPage.firstProductAmount)
        .toHaveValue(this.productAmount);

    if (this.productDiscount == "") {
        await expect(shoppingcartsummaryPage.firstProductPrice)
            .toHaveText(this.productPrice);
    } else {
        await expect(shoppingcartsummaryPage.firstProductReducedPrice)
            .toHaveText(this.productPrice);
    }
});

When('I click the Proceed to Checkout button on the shopping-cart summary page', async function () {
    await shoppingcartsummaryPage.proceedToCheckoutButton.click();
});

When('I add 1 product to my cart', async function () {
    this.cartCounterBeforeAddingProduct = await headerPage.cartCounter.getText();
    await productsPage.inStockFilter.click();
    const lastNumber = await productsPage.allProductImages.length;
    let randomInt = randomNumber(0, lastNumber - 1);
    await productsPage.allProductImages[randomInt].click();
    let avaliability = await productPage.availabilityValue.getText();
    let foundInStock = false;
    await browser.pause(1000);

    for (let i = 0; i < await productPage.productColor.length; i++) {
        await productPage.productColor[i].click();
        await browser.pause(1000);
        for (let j = 0; j < await productPage.productSizeOptions.length; j++) {
            await productPage.productSizeSelector.selectByIndex(j);
            await browser.pause(1000);
            avaliability = await productPage.availabilityValue.getText();
            if (avaliability == 'In stock') {
                foundInStock = true;
                break;
            }
        }
        if (foundInStock) {
            break;
        }
    }

    await productPage.addToCartButton.click();
    await browser.pause(1000);
});

Then('The counter on the cart is increased by 1', async function () {
    let cartCounterAfterAddingProduct = Number(this.cartCounterBeforeAddingProduct) + 1;
    await expect(await headerPage.cartCounter)
        .toHaveText(cartCounterAfterAddingProduct.toString());
});

When('I remove 1 item from my cart', async function () {
    await shoppingcartsummaryPage.open();
    await browser.pause(1000);
    await shoppingcartsummaryPage.firstRemoveItemButton.click();
    await browser.pause(1000);
});

Then('The counter displays that the cart is empty', async function () {
    await expect(await headerPage.cartCounter)
        .toHaveText("");
    await expect(await headerPage.emptyLabelCart)
        .toHaveText("(empty)");
});

When('I remove all products from the cart', async function () {
    await shoppingcartsummaryPage.open();
    await shoppingcartsummaryPage.removeAllProducts();
    await homePage.open();
});

When('I add {word} products to my cart', async function (numberOfProducts) {
    const amountOfCatalogMenuItems = await menuPage.menuItems.length;
    const amountOfProductImages = await productsPage.allProductImages.length;
    for (let iteration = 1; iteration <= Number(numberOfProducts); iteration++) {
        let randomIntegerForMenuItems = randomNumber(0, amountOfCatalogMenuItems - 2);
        await menuPage.menuItems[randomIntegerForMenuItems].click();
        await browser.pause(2000);
        this.cartCounterBeforeAddingProduct = await headerPage.cartCounter.getText();
        await productsPage.inStockFilter.click();
        let randomIntegerForProduct = randomNumber(0, amountOfProductImages - 1);
        await productsPage.allProductImages[randomIntegerForProduct].click();
        let avaliability = await productPage.availabilityValue.getText();
        let foundInStock = false;
        await browser.pause(1000);

        for (let i = 0; i < await productPage.productColor.length; i++) {
            await productPage.productColor[i].click();
            await browser.pause(1000);
            for (let j = 0; j < await productPage.productSizeOptions.length; j++) {
                await productPage.productSizeSelector.selectByIndex(j);
                await browser.pause(1000);
                avaliability = await productPage.availabilityValue.getText();
                if (avaliability == 'In stock') {
                    foundInStock = true;
                    break;
                }
            }
            if (foundInStock) {
                break;
            }
        }

        await productPage.addToCartButton.click();
        await browser.pause(3000);
        await productPage.continieShoppingButtonPopup.click();
    }
    await shoppingcartsummaryPage.open();
    await browser.pause(5000);
});