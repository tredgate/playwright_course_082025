//test_structures.spec.ts
import { expect, test } from "@playwright/test";

test.describe("Pmtool Login Tests", () => {
  test.beforeAll(() => {
    console.log("Běžím před prvním testem");
  });

  test.beforeEach(async ({ page }) => {
    console.log("Běžím před každým testem");
    await page.goto("https://tredgate.com/pmtool/");
  });

  test.afterEach(async ({ page }) => {
    console.log("Běžím po každém testu");
  });

  test.afterAll(() => {
    console.log("Běžím po posledním testu");
  });

  test("Successful login", async ({ page }) => {
    await page.locator("#username").fill("playwright_jaro24");
    await page.locator("#password").fill("Playwright!2024");
    await page.locator(".btn").click();
    await expect(
      page.locator("#welcome-page-header"),
      "Welcome Page Header Have Text"
    ).toHaveText("Vítej v testovací aplikaci Tredgate Project");
  });

  test("Failed Login", async ({ page }) => {
    await page.locator("#username").fill("NON_EXISTING");
    await page.locator("#password").fill("ABCD987");
    await page.locator(".btn").click();
    await expect(
      page.locator(".alert"),
      "Alert Message is Displayed"
    ).toBeVisible();
  });
});
