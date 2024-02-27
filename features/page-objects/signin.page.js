import { Page } from './page.js';

class signInPage extends Page {
    get pageTitle() { return $('.page-heading'); }
    get createAnAccountSubtitle() { return $('#create-account_form .page-subheading'); }
    get signInButton() { return $(`#SubmitLogin`); }
    input(title) { return $(`#login_form input[name="${title}"]`); }
}

export default new signInPage();