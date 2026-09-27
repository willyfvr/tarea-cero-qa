import { expect, Page, test, Locator } from '@playwright/test';
import { enableFlutterSemantics } from '../utils/flutter-helpers';
import { LOGIN_PAGE_TEXTS} from '../constants/app-text'

const TEST_PRO_USER = process.env.TEST_PRO_USER || 'undefined user';
const TEST_PRO_PASSWORD = process.env.TEST_PRO_PASS || 'undefined password';
const TEST_STANDARD_USER = process.env.TEST_STANDARD_USER || 'undefined user';
const TEST_STANDARD_PASSWORD = process.env.TEST_STANDARD_PASS || 'undefined password';



test.describe('Login to application with user PRO.', () => {
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
    await userInput.fill(TEST_PRO_USER);

    await pressTab;

    const passwordInput = page.getByRole('textbox', { name: 'Contraseña' });
    await passwordInput.click();
    await passwordInput.pressSequentially(TEST_PRO_PASSWORD, { delay: 50 });

    await pressTab;

    await loginButton.click();

    const newTaskButton = page.getByRole('button', {name: 'Nueva tarea'});
    await expect(newTaskButton).toBeVisible({timeout:10000})
  });
});


