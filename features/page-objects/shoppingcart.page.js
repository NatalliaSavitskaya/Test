import { Page } from './page.js';
import { browser } from '@wdio/globals';

class shoppingCartPage extends Page {
    get cartCounter(){return $('//div[@class="shopping_cart"]//span')} 
    get emptyLabelCart() {return $(`.ajax_cart_no_product`)}
    get proceedToCheckoutButton() { return $(`#center_column .right`) }  //p/a[@title="Proceed to checkout"]
    get pageTitle() { return $('.page-heading'); }
    get firstRemoveItemButton() { return $('.icon-trash'); }
    get firstProductName() { return $('table .product-name a'); }
    get firstProductSizeAndColor() { return $('//td[@class="cart_description"]//small//a[contains(text(),"Size")]'); } 
    get firstProductAmount() { return $('//input[@class="cart_quantity_input form-control grey"]'); }
    get firstProductPrice() { return $(`//li[@class='price']`)}
    get firstProductReducedPrice() { return $(`//li[@class='price special-price']`)}

    async open() {
        await browser.navigateTo('http://www.automationpractice.pl/index.php?controller=order');
        await expect(this.pageTitle)
        .toHaveText(expect.stringContaining('SHOPPING-CART SUMMARY'));
    }

    async removeAllProducts() {
        await browser.waitUntil(async() => {
            try {
                await this.firstRemoveItemButton.waitForDisplayed({ timeout: 2000 });
                console.log(`The cart is not empty`);
                await this.firstRemoveItemButton.click();
                return false;
            } catch {
                return true;
            }
        }, {timeout: 30000});
    }
}

export default new shoppingCartPage();