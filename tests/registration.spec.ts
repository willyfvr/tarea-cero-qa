import { expect, test } from '@playwright/test';
import { enableFlutterSemantics } from '../utils/flutter-helpers';
import { LoginPage } from '../pages/login-page';
import { RegistrationPage } from '../pages/registration-page';

test.describe('Registration entry and validation', () => {
  test.beforeEach(async ({ page }) => {
    // Start each scenario from the public login screen with Flutter semantics enabled.
    await page.goto('/');
    await enableFlutterSemantics(page);
  });

  test('opens the registration form, validates blank submission, and returns to login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);

    // Follow the registration link and check that every required field and action is present.
    await loginPage.registrationButton.click();

    await expect(registrationPage.heading).toBeVisible();
    await expect(registrationPage.emailInput).toBeVisible();
    await expect(registrationPage.usernameInput).toBeVisible();
    await expect(registrationPage.passwordInput).toBeVisible();
    await expect(registrationPage.confirmPasswordInput).toBeVisible();
    await expect(registrationPage.continueButton).toBeVisible();
    await expect(registrationPage.backButton).toBeVisible();

    // A blank submission exercises validation without creating an account.
    await registrationPage.continueButton.click();
    await expect(registrationPage.validationMessage).toBeVisible();

    // Confirm the registration screen provides a way back to login.
    await registrationPage.backButton.click();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
