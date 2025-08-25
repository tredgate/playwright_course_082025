// test_steps.spec.ts
import { expect, test } from "@playwright/test";

test("Using Test Steps", async ({ page }) => {
  await test.step("Open Pmtool", async () => {
    await page.goto("https://tredgate.com/pmtool");
  });

  await test.step("Login", async () => {
    await page.locator("#username").fill("playwright_jaro24");
    await page.locator("#password").fill("Playwright!2024");
    await page.locator(".btn").click();
  });

  await test.step("Open Projects and Open Add Project", async () => {
    await page.locator("#Projects").click();
    await expect(
      page.locator(".table-scrollable table"),
      "Projects Table is Visible"
    ).toBeVisible();
    await page.locator('[test_id="Add Project"]').click();
  });

  await test.step("Add Project Form Asserts", async () => {
    await expect(
      page.locator('div[data-testid="Name"] input'),
      "Name Input is Visible"
    ).toBeVisible();
    await expect(
      page.locator("button[type='submit']"),
      "Save Button Have Text"
    ).toHaveText("Save");
  });
});
