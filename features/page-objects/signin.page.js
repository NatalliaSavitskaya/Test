import { Page } from './page.js';
import { browser } from '@wdio/globals';

class signInPage extends Page {
    get pageTitle() { return $('.page-heading'); }
    get createAnAccountSubtitle() { return $('#create-account_form .page-subheading'); }
    get signInButton() { return $(`.button[name="SubmitLogin"]`); }
    input(title) { return $(`#login_form input[name="${title}"]`); }
}

export default new signInPage();