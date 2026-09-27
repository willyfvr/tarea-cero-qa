import { Page, Locator } from '@playwright/test';
import { LOGIN_PAGE_TEXTS } from '../constants/app-text';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder(LOGIN_PAGE_TEXTS.USERNAME_PLACEHOLDER);
    this.loginButton = page.getByRole('button', { name: LOGIN_PAGE_TEXTS.LOGIN_BUTTON });
  }
}