import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { enableFlutterSemantics } from '../utils/flutter-helpers';

test.describe('Login page access', () => {
  test.beforeEach(async ({ page }) => {
    // Load the public entry screen, then expose Flutter controls as accessible elements.
    await page.goto('/');
    await enableFlutterSemantics(page);
  });

  test('shows the login form', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Verify the login content and both account-recovery paths are available.
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.tagline).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.passwordRecoveryButton).toBeVisible();
    await expect(loginPage.registrationButton).toBeVisible();
  });
});
