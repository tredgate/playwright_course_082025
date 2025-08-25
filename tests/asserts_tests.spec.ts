// asserts_tests.spec.ts
import { expect, test } from "@playwright/test";

test("toContainText Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  await page.locator("#username").fill("playwright_jaro24");
  await page.locator("#password").fill("Playwright!2024");
  await page.locator(".btn").click();
  await expect(
    page.locator("#welcome-page-header"),
    "Welcome Page Header Contain Text"
  ).toContainText("Vítej v testovací aplikaci");
});

test("toHaveText Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  await page.locator("#username").fill("playwright_jaro24");
  await page.locator("#password").fill("Playwright!2024");
  await page.locator(".btn").click();
  await expect(
    page.locator("#welcome-page-header"),
    "Welcome Page Header Have Text"
  ).toHaveText("Vítej v testovací aplikaci Tredgate Project");
});

test.skip("Failing Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  await expect(page.locator(".form-title")).toHaveText("Přihlášení");
});

test("toBeVisibleTest", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  await expect(
    page.locator(".login-page-logo img"),
    "Login Logo is Visible"
  ).toBeVisible();
});

test("toHaveValue Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  const usernameValue = "PetrTest";
  const usernameInput = page.locator("#username");
  await usernameInput.fill(usernameValue);
  await expect(usernameInput, "Username Input Have Value").toHaveValue(
    usernameValue
  );
});

test("toBeChecked test", async ({ page }) => {
  await page.goto(
    "https://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html"
  );
  await expect(page.locator("input[value='option-3']")).toBeChecked();
});

test("toBeDisabled test", async ({ page }) => {
  await page.goto("http://tredgate.com/webtrain/registration.html");
  await expect(page.locator("#occupation")).toBeDisabled();
});

// ? Pokud chcete test vyzkoušet, odstraňte .skip
test.skip("Soft Assert Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  await expect
    .soft(page.locator(".form-title"), "Login Header Have Text")
    .toHaveText("Přihlášení");
  await page.locator("#username").fill("playwright_jaro24");
  await page.locator("#password").fill("Playwright!2024");
  await page.locator(".btn").click();
});

test("Negative Test", async ({ page }) => {
  await page.goto("http://tredgate.com/pmtool/");
  await expect(page.locator("#username")).toBeVisible(); // ? Čekání na načtení před negativním testem
  await expect(page.locator(".alert")).not.toBeVisible();
});
