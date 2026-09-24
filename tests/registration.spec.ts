import { expect, test } from '@playwright/test';
import { enableFlutterSemantics } from '../utils/flutter-helpers';

test.fixme('Register new user with valid information.', () => {
  // STEPS TO TEST
  // 1- access to site
  // 2- press "Registrate ahora" link
  // 3- check the navigation to registration form
  // 4- fill fields with the correct information (credentials)
  // 5- press submit button "CONTINUAR"

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tareacero.interaad.com.ar/');

    // Call the generic helper before running each test
    await enableFlutterSemantics(page);
  });

  test('User can see the login form.', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'INICIAR SESIÓN' });

    // Approach 1: Check that the element exists in the DOM tree (Most reliable for Flutter)
    await expect(loginButton).toBeAttached();

    // Approach 2: Standard visibility check with a explicit wait
    await expect(loginButton).toBeVisible({ timeout: 10000 });

    await page.getByRole('button', { name: 'Registrate ahora' }).click()

    // await page.getByRole('textbox', { name: 'Usuario o e-mail' }).fill('victor.fvr@gmail.com');

    //await loginButton.click();
  });
});
