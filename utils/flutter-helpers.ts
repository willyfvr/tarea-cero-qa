import { Page } from '@playwright/test';

/**
 * Enables Flutter Web semantics by triggering the accessibility placeholder
 * via direct DOM events, avoiding viewport/coordinate errors.
 */
export async function enableFlutterSemantics(page: Page): Promise<void> {
  const semanticsButton = page.locator('flt-semantics-placeholder, button[aria-label*="accessibility"]').first();

  // Flutter may render its accessibility toggle after navigation; wait for that state, not elapsed time.
  await semanticsButton.waitFor({ state: 'attached', timeout: 5000 }).catch(() => undefined);

  if (await semanticsButton.isVisible().catch(() => false)) {
    // Flutter can replace the placeholder between the visibility check and dispatched event.
    await semanticsButton.dispatchEvent('click', { timeout: 1000 }).catch(() => undefined);
  }

  if ((await page.locator('flt-semantics').count()) === 0) {
    // Some Flutter builds need focus to expose the semantics tree when the toggle is not visible.
    await page.mouse.click(10, 10);
    await page.keyboard.press('Tab');
  }
}