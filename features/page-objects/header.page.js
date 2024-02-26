import { Page } from './page.js';
import { browser } from '@wdio/globals';

class headerPage extends Page {
    get signInButton() { return $('.login'); }
    get signOutButton() { return $('.logout'); }
    get userFirstAndLastName() { return $('.header_user_info span'); }
    get cartCounter(){return $('//div[@class="shopping_cart"]//span')} 
    get emptyLabelCart() {return $(`.ajax_cart_no_product`)}
    get searchInputField() {return $(`search_query`)}
    get searchLoupeButton() {return $(`submit_search`)}
}

export default new headerPage();