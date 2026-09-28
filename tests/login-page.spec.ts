import { expect, Page, test, Locator } from '@playwright/test';
import { enableFlutterSemantics } from '../utils/flutter-helpers';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';

const TEST_PRO_USER = process.env.TEST_PRO_USER || 'undefined user';
const TEST_PRO_PASSWORD = process.env.TEST_PRO_PASS || 'undefined password';
const TEST_STANDARD_USER = process.env.TEST_STANDARD_USER || 'undefined user';
const TEST_STANDARD_PASSWORD = process.env.TEST_STANDARD_PASS || 'undefined password';

test.describe('Login to application with user PRO.', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await enableFlutterSemantics(page);

    await page.goto('https://tareacero.interaad.com.ar/');
  });

  test('Active user can be login.', async ({ page }) => {
    const loginButton = loginPage.loginButton;
    const pressTab = page.keyboard.press('Tab');
    await expect(loginButton).toBeAttached();

    // We complete login form
    const userInput = loginPage.usernameInput;
    await userInput.click();
    await userInput.fill(TEST_PRO_USER);

    await pressTab;

    const passwordInput = loginPage.passwordInput;
    await passwordInput.click();
    await passwordInput.pressSequentially(TEST_PRO_PASSWORD, { delay: 50 });

    await pressTab;

    await loginButton.click();

    const newTaskButton = homePage.newTaskButton;

    // We verified that the user logged in and the system navigated to the next page.
    await expect(newTaskButton).toBeVisible({ timeout: 10000 });
  });
});
