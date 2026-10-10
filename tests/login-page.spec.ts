import { expect, test } from '@playwright/test';
import { enableFlutterSemantics } from '../utils/flutter-helpers';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';

const testAccounts = [
  {
    role: 'PRO',
    username: process.env.TEST_PRO_USER,
    password: process.env.TEST_PRO_PASS,
    usernameVariable: 'TEST_PRO_USER',
    passwordVariable: 'TEST_PRO_PASS',
  },
  {
    role: 'standard',
    username: process.env.TEST_STANDARD_USER,
    password: process.env.TEST_STANDARD_PASS,
    usernameVariable: 'TEST_STANDARD_USER',
    passwordVariable: 'TEST_STANDARD_PASS',
  },
];

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    // Begin from the login screen for each account-specific sign-in scenario.
    await page.goto('/');
    await enableFlutterSemantics(page);
  });

  for (const account of testAccounts) {
    test(`an active ${account.role} account can sign in`, async ({ page }) => {
      if (!account.username || !account.password) {
        // Skip only this scenario when its dedicated test-account credentials are not configured.
        test.skip(true, `Set ${account.usernameVariable} and ${account.passwordVariable} to run this scenario.`);
        return;
      }
      const pressTab = page.keyboard.press('Tab');
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);

      // Enter the configured test account and submit the login form.
      const loginUsernameInput = loginPage.usernameInput;
      await loginUsernameInput.click();
      await loginUsernameInput.fill(account.username);

      await pressTab;

      const loginPasswordInput = loginPage.passwordInput;
      await loginPasswordInput.click();
      await loginPasswordInput.fill(account.password);

      await pressTab;
      await loginPage.loginButton.click();

      // The authenticated home-page control is the observable success condition for sign-in.
      await expect(homePage.newTaskButton).toBeVisible({ timeout: 10000 });
    });
  }
});
