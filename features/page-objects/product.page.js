import { Page } from './page.js';
import { browser } from '@wdio/globals';

class productPage extends Page {
    get productSizeOptions() { return $$(`//div[@class="attribute_list"]//option`); }
    get productSizeSelector() { return $(`.selector select`); }
    get productColor() { return $$(`//a[contains(@class,"color_pick")]`) }
    get addToCartButton() { return $('#add_to_cart span')} 
    get availabilityValue() { return $(`#availability_value`) }
    get productTitle() { return $(`//h1[@itemprop]`) }
    get productLastPrice() {return $('#our_price_display')} //$16
    get proceedToCheckoutButtonPopup() { return $(`.button-medium span`) }   //a[@title="Proceed to checkout"]
    get productQuantity() { return $(`#quantity_wanted`) } // value=1
    get productReductionPercent() { return $(`#reduction_percent_display`) } // -5% or empty
    //get popUpWindowMessage() { return $(`//h2/i[@class="icon-check"]`) } // Product successfully added to your shopping cart
    
}

export default new productPage();