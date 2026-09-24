import { expect, test } from '@playwright/test';
import { enableFlutterSemantics } from '../utils/flutter-helpers';

const TEST_USER = process.env.TEST_USER || 'undefined user';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'undefined password';

test.describe('Login to application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tareacero.interaad.com.ar/');

    await enableFlutterSemantics(page);
  });

  test('Active user can be login.', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'INICIAR SESIÓN' });
    const pressTab = page.keyboard.press('Tab');
    await expect(loginButton).toBeAttached();

    // complete login form
    const userInput = page.getByRole('textbox', { name: 'Usuario o e-mail' });
    await userInput.click();
    await userInput.fill(TEST_USER);

    await pressTab;

    const passwordInput = page.getByRole('textbox', { name: 'Contraseña' });
    await passwordInput.click();
    await passwordInput.pressSequentially(TEST_PASSWORD, { delay: 50 });

    await pressTab;

    await loginButton.click();
  });
});
