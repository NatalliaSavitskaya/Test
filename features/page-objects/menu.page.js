import { Page } from './page.js';
import { randomNumber } from '../utils/utils.js';

class menuPage extends Page {
    get menuItems() { return $$('ul[class*=menu-content]>li>a'); }

    async selectRandomMenuItem() {
        const amountOfCatalogMenuItems = await this.menuItems.length;
        const randomIntegerForMenuItems = randomNumber(0, amountOfCatalogMenuItems - 2); // the last menu item "Blog" is not a catalog
        await this.menuItems[randomIntegerForMenuItems].click();
    }
}

export default new menuPage();