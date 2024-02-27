import { Page } from './page.js';

class searchPage extends Page {
    get searchInputField() { return $(`#search_query_top`) }
    get searchLoupeButton() { return $(`.button-search`) }
    get searchResults() { return $$(`.product-container .product-name`) }
    get searchResultMessage() { return $$(`.page-heading span`) }
}

export default new searchPage();