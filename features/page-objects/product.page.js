import { Page } from './page.js';
import { browser } from '@wdio/globals';

class productPage extends Page {
    get productSizeSelector() { return $(`.selector select`); }
    get productSizeOptions() { return $$(`.attribute_list option`); }
    get productColors() { return $$(`#color_to_pick_list li a`) }
    get productTitle() { return $(`h1[itemprop="name"]`) }
    get productQuantity() { return $(`#quantity_wanted`) } // value=1
    get productLastPrice() { return $('#our_price_display') } //$16
    get productReductionPercent() { return $(`#reduction_percent_display`) } // -5% or empty
    get availabilityValue() { return $(`#availability_value`) }  // "In stock" label
    get addToCartButton() { return $('#add_to_cart button') }
    // Pop-up window:
    get continueShoppingButtonPopup() { return $(`.button-container .continue`) }
    get closeButtonPopup() { return $(`.cross`) }

    async selectFirstAvailableSizeAndColor() {
        let foundInStock = false;
        let numberOfColors = await this.productColors.length;
        let numberOfSizeOptions = await this.productSizeOptions.length;
        for (let colorCounter = 0; colorCounter < numberOfColors; colorCounter++) {
            await this.productColors[colorCounter].click();
            for (let sizeCounter = 1; sizeCounter <= numberOfSizeOptions; sizeCounter++) {
                await this.productSizeSelector.click();
                await this.productSizeSelector.selectByAttribute('value', sizeCounter.toString());
                let avaliability = await this.availabilityValue.getText();
                if (avaliability === 'In stock') {
                    foundInStock = true;
                    break;
                }
            }
            if (foundInStock) {
                break;
            }
        }
        await browser.refresh(); // this was added to apply the selected Size and Color so that the Add to Card button appears
    }
}

export default new productPage();