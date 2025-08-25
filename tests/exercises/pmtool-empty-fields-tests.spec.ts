import { expect, test } from "@playwright/test";

test("Exercise: Login Validation Asserts", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator(".btn").click();
  const usernameError = page.locator("#username-error");
  const passwordError = page.locator("#password-error");
  await expect(usernameError, "Username Error is Visible").toBeVisible();
  await expect(usernameError, "Username Error Have Text").toHaveText(
    "This field is required!"
  );
  await expect(passwordError, "Password Error is Visible").toBeVisible();
  await expect(passwordError, "Password Error Have Text").toHaveText(
    "This field is required!"
  );
});

test("Exercise: Validation Alerts Not Visible", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await expect(page.locator("#username")).toBeVisible();
  await expect(
    page.locator("#username-error"),
    "Username Error is Not Visible"
  ).not.toBeVisible();
  await expect(
    page.locator("#password-error"),
    "Password Error is Not Visible"
  ).not.toBeVisible();
});
