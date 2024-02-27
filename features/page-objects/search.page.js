import { Page } from './page.js';
//import { browser } from '@wdio/globals';

class searchPage extends Page {
    get searchInputField() {return $(`#search_query_top`)}
    get searchLoupeButton() {return $(`.button-search`)}
    get searchResults() {return $$(`.product-container .product-name`)}
    get searchResultMessage() {return $$(`.page-heading span`)}
}

export default new searchPage();