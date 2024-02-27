import { Given, When, Then } from '@wdio/cucumber-framework';
import productsPage from '../page-objects/products.page.js';
import productPage from '../page-objects/product.page.js';
import shoppingCartPage from '../page-objects/shoppingcart.page.js';
import menuPage from '../page-objects/menu.page.js';
import { parseSize } from '../utils/utils.js';
import { parseColor } from '../utils/utils.js';
import { priceStringToNumber } from '../utils/utils.js';

When('I add 1 product to my cart', async function () {
    await menuPage.selectRandomMenuItem();
    this.cartCounterBeforeAddingOneProduct = await shoppingCartPage.cartCounter.getText();
    await productsPage.inStockFilter.click();
    await productsPage.selectRandomProduct();
    let foundInStock = false;
    let numberOfColors = await productPage.productColors.length;
    let numberOfSizeOptions = await productPage.productSizeOptions.length;
    for (let colorCounter = 0; colorCounter < numberOfColors; colorCounter++) {
        await productPage.productColors[colorCounter].click();
        for (let sizeCounter = 1; sizeCounter <= numberOfSizeOptions; sizeCounter++) {
            await productPage.productSizeSelector.click();
            await productPage.productSizeSelector.selectByAttribute('value', sizeCounter.toString());
            let avaliability = await productPage.availabilityValue.getText();
            if (avaliability === 'In stock') {
                this.productTitle = await productPage.productTitle.getText();
                this.productSize = await productPage.productSizeOptions[sizeCounter - 1].getAttribute('title');
                this.productColor = await productPage.productColors[colorCounter].getAttribute('name');
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
    await browser.refresh(); // this was added to apply the selected Size and Color so that the Add to Card button appears
    await productPage.addToCartButton.click();
    await expect(await productPage.successfullMessage)
        .toHaveText(expect.stringContaining("Product successfully added to your shopping cart"));
    await productPage.closeButtonPopup.waitForDisplayed({ timeout: 2000 });
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

    await expect(await shoppingCartPage.firstProductQty)
        .toHaveValue(this.productAmount);

    if (this.productDiscount == "") {
        await expect(await shoppingCartPage.firstProductUnitPrice)
            .toHaveText(this.productPrice);
        const expectedfirstProductTotal =
            await shoppingCartPage.firstProductQty.getValue() *
            priceStringToNumber(await shoppingCartPage.firstProductUnitPrice.getText());

        await expect(await shoppingCartPage.firstProductTotal)
            .toHaveText(`$${expectedfirstProductTotal}`);
    } else {
        await expect(await shoppingCartPage.firstProductReducedPrice)
            .toHaveText(this.productPrice);
        const expectedfirstProductTotalReducedPrice =
            await shoppingCartPage.firstProductQty.getValue() *
            priceStringToNumber(await shoppingCartPage.firstProductReducedPrice.getText());
        await expect(await shoppingCartPage.firstProductTotal)
            .toHaveText(`$${expectedfirstProductTotalReducedPrice}`);
    }

    const expectedProductTotal = await shoppingCartPage.firstProductTotal.getText()
    await expect(await shoppingCartPage.totalProducts)
        .toHaveText(expectedProductTotal);

    const expectedTotal =
        priceStringToNumber(await shoppingCartPage.totalProducts.getText()) +
        priceStringToNumber(await shoppingCartPage.totalShipping.getText());

    await expect(await shoppingCartPage.total)
        .toHaveText(`$${expectedTotal}`);
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

Given('I have no products in my cart', async function () {
    await shoppingCartPage.open();
    await shoppingCartPage.removeAllProducts();
});

When('I remove 1 item from my cart', async function () {
    await shoppingCartPage.open();
    await shoppingCartPage.firstRemoveItemButton.click();
});

When('I add {int} products to my cart', async function (numberOfProducts) {
    if (numberOfProducts < 2) {
        throw `ERROR: The incorrect number of products is entered!`;
    }
    else {
        for (let iteration = 1; iteration <= numberOfProducts; iteration++) {
            await menuPage.selectRandomMenuItem();
            await productsPage.inStockFilter.click();
            await productsPage.selectRandomProduct();
            await productPage.selectFirstAvailableSizeAndColor();
            await productPage.addToCartButton.click();
            await expect(await productPage.successfullMessage)
                .toHaveText(expect.stringContaining("Product successfully added to your shopping cart"));
            await productPage.continueShoppingButtonPopup.waitForDisplayed({ timeout: 2000 });
            await productPage.continueShoppingButtonPopup.click();
        }
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