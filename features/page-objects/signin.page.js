import { Page } from './page.js';
import { browser } from '@wdio/globals';

class signInPage extends Page {
    get signInButton() { return $(`.button[name="SubmitLogin"]`); }
    input(title) { return $(`#login_form input[name="${title}"]`); }
}

export default new signInPage();