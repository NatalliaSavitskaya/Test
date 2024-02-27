import { Page } from './page.js';
import { browser } from '@wdio/globals';

class shoppingCartPage extends Page {
    get cartCounter() { return $('div[class=shopping_cart]>a>span[class*=cart_quantity]') }
    get emptyLabelCart() { return $(`.ajax_cart_no_product`) }
    get proceedToCheckoutButton() { return $(`p[class*=cart_navigation] a[title="Proceed to checkout"]`) }
    get pageTitle() { return $('.page-heading'); }
    get firstRemoveItemButton() { return $('.icon-trash'); }
    get firstProductName() { return $('table .product-name a'); }
    get firstProductSizeAndColor() { return $('td[class=cart_description] small a[href*=size]'); }
    get firstProductUnitPrice() { return $(`li[class=price]`) }
    get firstProductReducedPrice() { return $(`*[class='price special-price']`) }
    get firstProductQty() { return $('input[class*=cart_quantity_input]'); }
    get firstProductTotal() { return $(`td[data-title=Total] .price`) }
    get totalProducts() { return $(`.cart_total_price > #total_product`) }
    get totalShipping() { return $(`.cart_total_delivery > #total_shipping`) }
    get total() { return $(`.cart_total_price #total_price`) }

    async open() {
        await browser.navigateTo('http://www.automationpractice.pl/index.php?controller=order');
        await expect(this.pageTitle)
            .toHaveText(expect.stringContaining('SHOPPING-CART SUMMARY'));
    }

    async removeAllProducts() {
        await browser.waitUntil(async () => {
            try {
                await this.firstRemoveItemButton.waitForDisplayed({ timeout: 2000 });
                await this.firstRemoveItemButton.click();
                return false;
            } catch {
                return true;
            }
        }, { timeout: 30000 });
    }
}

export default new shoppingCartPage();