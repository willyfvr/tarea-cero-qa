import { test } from '@playwright/test';

// This authenticated flow is disabled until it can use disposable data and clean it up.
test.fixme('an authenticated user can create a task', async ({ page }) => {
  // Creating a task changes real application data, so don't enable this placeholder against a live account.
  await page.goto('/');
});
