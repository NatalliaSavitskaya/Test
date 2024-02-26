import { Page } from './page.js';
import { browser } from '@wdio/globals';

class menuPage extends Page {
    get menuItems() { return $$('//ul[contains(@class,"menu-content")]/li/a'); }
    selectMenuItem (title) {return $(`//ul[contains(@class,"menu-content")]/li/a[contains(@title,"${title}")]`);}
}

export default new menuPage();