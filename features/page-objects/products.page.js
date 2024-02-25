import { Page } from './page.js';
import { browser } from '@wdio/globals';

class productsPage extends Page {
    get inStockFilter() { return $(`//a[contains(text(),"In stock")]`); }
    get allProductImages () {return $$(`//div[@class="product-image-container"]/a[1]`)}
}

export default new productsPage();