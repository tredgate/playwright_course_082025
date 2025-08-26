//failing_tests.spec.ts
import { expect, test } from "@playwright/test";

test.describe.skip("Failing tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/pmtool");
  });

  test("Invalid selector", async ({ page }) => {
    // ? Lokátor: #username123 neexistuje
    await page.locator("#username123").fill("test");
  });

  test("Failing assert", async ({ page }) => {
    // ? Nadpis na login stránce má nadpis: Login
    await expect(page.locator(".form-title")).toHaveText("Přihlášení");
  });

  test("Missing awaits", async ({ page }) => {
    page.goto("https://tredgate.com/pmtool");
    page.locator("#username").fill("test");
    page.locator("#password").fill("test");
    page.locator(".btn").click();
  });

  test("Debug Mode test", async ({ page }) => {
    await page.goto("https://tredgate.com/pmtool");
    await page.locator("#username").fill("test");
    await page.locator("#password").fill("test");
    await page.locator(".btn").click();
  });
});
