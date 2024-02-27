import { Page } from './page.js';

class headerPage extends Page {
    get signInButton() { return $('.login'); }
    get signOutButton() { return $('.logout'); }
    get userFirstAndLastName() { return $('.header_user_info span'); }
}

export default new headerPage();