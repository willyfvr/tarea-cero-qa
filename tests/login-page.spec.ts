import {expect, test} from '@playwright/test';
import {enableFlutterSemantics} from '../utils/flutter-helpers';

const TEST_PRO_USER = process.env.TEST_PRO_USER || "undefined user"
const TEST_PRO_PASS = process.env.TEST_PRO_PASS || "undefined password"

test.describe('Login to application', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('https://tareacero.interaad.com.ar/');

    await enableFlutterSemantics(page);
  })

  test('Active user can be login.', async({page}) => {
    const loginButton = page.getByRole('button', {name: 'INICIAR SESIÓN'});
    const pressTab = page.keyboard.press('Tab');
    await expect(loginButton).toBeAttached();

    // complete login form
    const userInput = page.getByRole('textbox', {name: 'Usuario o e-mail'})
    await userInput.click();
    await userInput.fill('victor.fvr@gmail.com');
    
    await pressTab;

    const passwordInput = page.getByRole('textbox', { name: 'Contraseña' });
    await passwordInput.click();
    await passwordInput.pressSequentially('Admin1234', { delay: 50 });

    await pressTab;

    
    await loginButton.click();
  })
});