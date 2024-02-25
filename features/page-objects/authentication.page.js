import { Page } from './page.js';
import { browser } from '@wdio/globals';

class authenticationPage extends Page {
    get pageTitle() { return $('.page-heading'); }
}

export default new authenticationPage();