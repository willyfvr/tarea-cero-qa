import { Locator, Page } from '@playwright/test';
import { LOGIN_PAGE_TEXTS } from '../constants/app-text';

export class LoginPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly tagline: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly passwordRecoveryButton: Locator;
  readonly registrationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByText(LOGIN_PAGE_TEXTS.HEADING, { exact: true });
    this.tagline = page.getByText(LOGIN_PAGE_TEXTS.TAGLINE, { exact: true });
    this.usernameInput = page.getByLabel(LOGIN_PAGE_TEXTS.USERNAME_INPUT);
    this.passwordInput = page.getByLabel(LOGIN_PAGE_TEXTS.PASSWORD_INPUT);
    this.loginButton = page.getByRole('button', { name: LOGIN_PAGE_TEXTS.LOGIN_BUTTON });
    this.passwordRecoveryButton = page.getByRole('button', { name: LOGIN_PAGE_TEXTS.PASSWORD_RECOVERY_BUTTON });
    this.registrationButton = page.getByRole('button', { name: LOGIN_PAGE_TEXTS.REGISTRATION_BUTTON });
  }
}
