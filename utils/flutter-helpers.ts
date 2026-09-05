import {Page} from "@playwright/test";

/**
 * Enables Flutter Web semantics by triggering the accessibility placeholder
 * via direct DOM events, avoiding viewport/coordinate errors.
 */
export async function enableFlutterSemantics(page: Page): Promise<void> {
  const semanticsButton = page.locator('flt-semantics-placeholder, button[aria-label*="accessibility"]').first();

  // Wait for the element to attach to the DOM
  await semanticsButton.waitFor({ state: 'attached', timeout: 5000 }).catch(() => null);

  if (await semanticsButton.isVisible().catch(() => false)) {
    // Dispatch direct DOM event to bypass viewport bounds
    await semanticsButton.dispatchEvent('click');
  } else {
    // Fallback interaction to force Flutter to register focus
    await page.mouse.click(10, 10);
    await page.keyboard.press('Tab');
  }

  // Allow Flutter time to mount the semantics tree
  await page.waitForTimeout(2000);
}