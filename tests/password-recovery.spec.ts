import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { PasswordRecoveryPage } from '../pages/password-recovery-page';
import { enableFlutterSemantics } from '../utils/flutter-helpers';

test.describe('Password recovery', () => {
  test.beforeEach(async ({ page }) => {
    // Start from login so the test exercises the same recovery entry point as a user.
    await page.goto('/');
    await enableFlutterSemantics(page);
  });

  test('validates an empty recovery request and returns to login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const recoveryPage = new PasswordRecoveryPage(page);

    // Open recovery and check its email field and available actions.
    await loginPage.passwordRecoveryButton.click();

    await expect(recoveryPage.heading).toBeVisible();
    await expect(recoveryPage.emailInput).toBeVisible();
    await expect(recoveryPage.submitButton).toBeVisible();
    await expect(recoveryPage.backButton).toBeVisible();

    // Do not enter or submit a real address; blank validation does not send recovery email.
    await recoveryPage.submitButton.click();
    await expect(recoveryPage.validationMessage).toBeVisible();

    // Verify the user can leave recovery and return to the login form.
    await recoveryPage.backButton.click();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
