// page_objects_tests.spec.ts
import { test } from "@playwright/test";
import { LoginPage } from "../pages/login_page.ts";
import { DashboardPage } from "../pages/dashboard_page.ts";
import { LoginFluentPage } from "../pages/fluent/login_fluent_page.ts";

test("Test Page Objects", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool();
  await loginPage.fillUsername("playwright_jaro24");
  await loginPage.fillPassword("Playwright!2024");
  await loginPage.clickLogin();
});

test("Page Objects Grouped Methods", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool();
  await loginPage.login("playwright_jaro24", "Playwright!2024");
});

test("Login and Logout from Pmtool", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.openPmtool();
  await loginPage.login("playwright_jaro24", "Playwright!2024");
  await dashboardPage.logout();
});

test("Fluent Interface with Page Objects", async ({ page }) => {
  const loginPage = new LoginFluentPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.fillUsername("playwright_jaro24"))
    .then((login) => login.fillPassword("Playwright!2024"))
    .then((login) => login.clickLogin())
    .then((dashboard) => dashboard.logout());
});
