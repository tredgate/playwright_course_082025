// iframe_actions_tests.spec.ts

import { test } from "@playwright/test";

test("Operating with iFrames", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  // ! Nebude fungovat, prvek je v iframe
  //   await page.locator("#name").fill("TestIframe");
  const frame = page.frameLocator('[data-testid="test-automation-iframe"]');
  await frame.locator("#name").fill("TestIframe");
});
