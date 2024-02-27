import { Page } from './page.js';
//import { browser } from '@wdio/globals';

class headerPage extends Page {
    get signInButton() { return $('.login'); }
    get signOutButton() { return $('.logout'); }
    get userFirstAndLastName() { return $('.header_user_info span'); }  
}

export default new headerPage();