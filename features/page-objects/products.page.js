import { Page } from './page.js';
import { randomNumber } from '../utils/utils.js';

class productsPage extends Page {
    get inStockFilter() { return $(`a[href*=availability-in_stock]`); }
    get allProductImages() { return $$(`div[class=product-image-container]`) }

    async selectRandomProduct() {
        const amountOfProductImages = await this.allProductImages.length;
        const randomIntegerForProduct = randomNumber(0, amountOfProductImages - 1);
        await this.allProductImages[randomIntegerForProduct].click();
    }
}

export default new productsPage();