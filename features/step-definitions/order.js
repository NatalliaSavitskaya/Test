import { Given, When, Then } from '@wdio/cucumber-framework';
import productsPage from '../page-objects/products.page.js';
import productPage from '../page-objects/product.page.js';
import shoppingCartPage from '../page-objects/shoppingcart.page.js';
import homePage from '../page-objects/home.page.js';
import menuPage from '../page-objects/menu.page.js';
import { parseSize } from '../utils/utils.js';
import { parseColor } from '../utils/utils.js';

When('I add 1 product to my cart', async function () {
    await menuPage.selectRandomMenuItem();
    this.cartCounterBeforeAddingOneProduct = await shoppingCartPage.cartCounter.getText();
    await productsPage.inStockFilter.click();
    await productsPage.selectRandomProduct();
    let avaliability = await productPage.availabilityValue.getText();
    let foundInStock = false;
    for (let i = 0; i < await productPage.productColors.length; i++) {
        await productPage.productColors[i].click();
        for (let j = 0; j < await productPage.productSizeOptions.length; j++) {
            await productPage.productSizeSelector.selectByIndex(j);
            await browser.pause(1000);
            avaliability = await productPage.availabilityValue.getText();
            if (avaliability == 'In stock') {
                this.productTitle = await productPage.productTitle.getText();
                this.productSize = await productPage.productSizeOptions[j].getAttribute('title');
                this.productColor = await productPage.productColors[i].getAttribute('name');
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
    await browser.pause(2000);
    await productPage.addToCartButton.click();
    await browser.pause(2000);
    await productPage.closeButtonPopup.click();
});

When('A correct order information is displayed', async function () {
    await expect(await shoppingCartPage.firstProductName)
        .toHaveText(this.productTitle);

    await expect(await shoppingCartPage.firstProductSizeAndColor)
        .toHaveText(expect.stringContaining(this.productColor));

    await expect(await shoppingCartPage.firstProductSizeAndColor)
        .toHaveText(expect.stringContaining(this.productSize));

    const firstproductSizeAndColor = await shoppingCartPage.firstProductSizeAndColor.getText();
    const size = parseSize(firstproductSizeAndColor);
    const color = parseColor(firstproductSizeAndColor);
    if (!size == this.productSize) {
        throw `ERROR: The size is incorrect!`;
    }
    if (!color == this.productColor) {
        throw `ERROR: The color is incorrect!`;
    }

    await expect(await shoppingCartPage.firstProductAmount)
        .toHaveValue(this.productAmount);

    if (this.productDiscount == "") {
        await expect(shoppingCartPage.firstProductPrice)
            .toHaveText(this.productPrice);
    } else {
        await expect(shoppingCartPage.firstProductReducedPrice)
            .toHaveText(this.productPrice);
    }
});

When('I click the Proceed to Checkout button', async function () {
    await shoppingCartPage.proceedToCheckoutButton.click();
});

Then('The counter on the cart is increased by 1', async function () {
    let cartCounterAfterAddingProduct = Number(this.cartCounterBeforeAddingOneProduct) + 1;
    await expect(await shoppingCartPage.cartCounter)
        .toHaveText(cartCounterAfterAddingProduct.toString());
});

When('I am on my shopping cart page', async function () {
    await shoppingCartPage.open();
});

When('I remove 1 item from my cart', async function () {
    await shoppingCartPage.open();
    await shoppingCartPage.firstRemoveItemButton.click();
});

When('I add {word} products to my cart', async function (numberOfProducts) {
    if (numberOfProducts < 2) {
        throw `ERROR: The incorrect number of products is entered!`;
    }
    else {
        for (let iteration = 1; iteration <= Number(numberOfProducts); iteration++) {
            await menuPage.selectRandomMenuItem();
            await productsPage.inStockFilter.click();
            await productsPage.selectRandomProduct();
            await productPage.selectFirstAvailableSizeAndColor();
            await browser.pause(2000);
            await productPage.addToCartButton.click();
            await browser.pause(2000);
            await productPage.continueShoppingButtonPopup.click();
        }
        await shoppingCartPage.open();
    }
});

When('I remove all products from the cart', async function () {
    await shoppingCartPage.open();
    await shoppingCartPage.removeAllProducts();
});

Then('The counter displays that the cart is empty', async function () {
    await expect(await shoppingCartPage.cartCounter)
        .toHaveText("");
    await expect(await shoppingCartPage.emptyLabelCart)
        .toHaveText("(empty)");
});