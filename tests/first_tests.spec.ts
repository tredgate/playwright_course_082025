import { test } from "@playwright/test";

// ? pwt - zkratka (snippet) pro vytvoření testu
test("First Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  await page.locator("#username").fill("playwright_jaro24");
  await page.locator("#password").fill("Playwright!2024");
  await page.locator(".btn").click();
});
