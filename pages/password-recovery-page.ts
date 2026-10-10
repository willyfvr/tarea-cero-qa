import { Locator, Page } from '@playwright/test';
import { PASSWORD_RECOVERY_TEXTS } from '../constants/app-text';

export class PasswordRecoveryPage {
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly backButton: Locator;
  readonly validationMessage: Locator;

  constructor(page: Page) {
    this.heading = page.getByText(PASSWORD_RECOVERY_TEXTS.HEADING, { exact: true });
    this.emailInput = page.getByLabel(PASSWORD_RECOVERY_TEXTS.EMAIL_INPUT);
    this.submitButton = page.getByRole('button', { name: PASSWORD_RECOVERY_TEXTS.SUBMIT_BUTTON });
    this.backButton = page.getByRole('button', { name: PASSWORD_RECOVERY_TEXTS.BACK_BUTTON });
    // Flutter mirrors visible validation text into a live announcement node.
    this.validationMessage = page.getByText(PASSWORD_RECOVERY_TEXTS.VALIDATION_MESSAGE, { exact: true }).last();
  }
}
