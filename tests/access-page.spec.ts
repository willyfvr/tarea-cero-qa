import { test, expect } from '@playwright/test';
import { enableFlutterSemantics } from '../utils/flutter-helpers';

test.describe('Check Access to the login page.', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('https://tareacero.interaad.com.ar/');

    // Call the generic helper before running each test
    await enableFlutterSemantics(page)
  });

  test('User can see the login form.', async ({page}) => {

    const loginButton = page.getByRole('button', {name: 'INICIAR SESIÓN'});

    // Approach 1: Check that the element exists in the DOM tree (Most reliable for Flutter)
    await expect(loginButton).toBeAttached();

    // Approach 2: Standard visibility check with a explicit wait
    await expect(loginButton).toBeVisible({timeout: 10000});
  })
});