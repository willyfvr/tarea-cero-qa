import { Locator, Page } from '@playwright/test';
import { REGISTRATION_PAGE_TEXTS } from '../constants/app-text';

export class RegistrationPage {
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly continueButton: Locator;
  readonly backButton: Locator;
  readonly validationMessage: Locator;

  constructor(page: Page) {
    this.heading = page.getByText(REGISTRATION_PAGE_TEXTS.HEADING, { exact: true });
    this.emailInput = page.getByLabel(REGISTRATION_PAGE_TEXTS.EMAIL_INPUT);
    this.usernameInput = page.getByLabel(REGISTRATION_PAGE_TEXTS.USERNAME_INPUT);
    // Exact matching avoids colliding with the similarly named confirmation field.
    this.passwordInput = page.getByLabel(REGISTRATION_PAGE_TEXTS.PASSWORD_INPUT, { exact: true });
    this.confirmPasswordInput = page.getByLabel(REGISTRATION_PAGE_TEXTS.CONFIRM_PASSWORD_INPUT);
    this.continueButton = page.getByRole('button', { name: REGISTRATION_PAGE_TEXTS.CONTINUE_BUTTON });
    this.backButton = page.getByRole('button', { name: REGISTRATION_PAGE_TEXTS.BACK_BUTTON });
    // Flutter mirrors visible validation text into a live announcement node.
    this.validationMessage = page.getByText(REGISTRATION_PAGE_TEXTS.VALIDATION_MESSAGE, { exact: true }).last();
  }
}
