import { Page } from './page.js';
import { browser } from '@wdio/globals';

class menuPage extends Page {
    get menuItem() { return $('a[title="Women"]'); }
    selectMenuItem (title) {return $(`//ul[contains(@class,"menu-content")]/li/a[contains(@title,"${title}")]`);}
}

export default new menuPage();