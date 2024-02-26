import { Page } from './page.js';
import { browser } from '@wdio/globals';

class productPage extends Page {
    get productSizeSelector() { return $(`.selector select`); }
    get productSizeOptions() { return $$(`//div[@class="attribute_list"]//option`); }
    get productColors() { return $$(`//a[contains(@class,"color_pick")]`) }
    get productTitle() { return $(`//h1[@itemprop]`) }
    get productQuantity() { return $(`#quantity_wanted`) } // value=1
    get productLastPrice() { return $('#our_price_display') } //$16
    get productReductionPercent() { return $(`#reduction_percent_display`) } // -5% or empty
    get availabilityValue() { return $(`#availability_value`) }  // "In stock" label
    get addToCartButton() { return $('#add_to_cart span') }
    // Pop-up window:
    get proceedToCheckoutButtonPopup() { return $(`.button-medium span`) }  
    get continueShoppingButtonPopup() { return $(`.continue span`) }
    get closeButtonPopup() { return $(`.cross`) }

    async selectFirstAvailableSizeAndColor() {
        let avaliability;
        let foundInStock = false;
        for (let i = 0; i < await this.productColors.length; i++) {
            await this.productColors[i].click();
            await browser.pause(1000);
            for (let j = 0; j < await this.productSizeOptions.length; j++) {
                await this.productSizeSelector.selectByIndex(j);
                await browser.pause(1000);
                avaliability = await this.availabilityValue.getText();
                if (avaliability == 'In stock') {
                    foundInStock = true;
                    break;
                }
            }
            if (foundInStock) {
                break;
            }
        }
    }
}

export default new productPage();