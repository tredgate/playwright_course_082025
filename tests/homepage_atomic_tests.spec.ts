//homepage_atomic_tests.spec.ts
import { test, expect } from "@playwright/test";
import { LoginFluentPage } from "../pages/fluent/login_fluent_page.ts";
import { DashboardPageAtomic } from "../pages/atomic/dashboard_atomic_page.ts";

test.describe("Homepage Atomic Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = await new LoginFluentPage(page);
    await loginPage
      .openPmtool()
      .then((page) => page.fillUsername("pw_skoleni"))
      .then((page) => page.fillPassword("TEG2023"))
      .then((page) => page.clickLogin());
  });

  test("Top bar checks", async ({ page }) => {
    const homepage = await new DashboardPageAtomic(page);
    await expect.soft(homepage.profileButton).toBeVisible();
    await expect.soft(homepage.headerTitle).toBeVisible();
    await expect.soft(homepage.bellIcon).toBeVisible();
    await expect
      .soft(homepage.headerTitle)
      .toContainText("TEG Project Management");
  });

  test("Left menu checks", async ({ page }) => {
    const homepage = await new DashboardPageAtomic(page);
    await expect.soft(homepage.dashboard).toBeVisible();
    await expect.soft(homepage.projects).toBeVisible();
    await expect.soft(homepage.users).toBeVisible();
    await expect.soft(homepage.reports).toBeVisible();
    await expect.soft(homepage.configuration).toBeVisible();
    await expect.soft(homepage.applicationStructure).toBeVisible();
    await expect.soft(homepage.extension).toBeVisible();
    await expect.soft(homepage.tools).toBeVisible();
    await expect.soft(homepage.documentation).toBeVisible();
    await expect.soft(homepage.logo).toBeVisible();
    await expect.soft(homepage.dashboard).toContainText("Dashboard");
    await expect.soft(homepage.projects).toContainText("Projects");
    await expect.soft(homepage.users).toContainText("Users");
    await expect.soft(homepage.reports).toContainText("Reports");
    await expect.soft(homepage.configuration).toContainText("Configuration");
    await expect
      .soft(homepage.applicationStructure)
      .toContainText("Application Structure");
    await expect.soft(homepage.extension).toContainText("Extension");
    await expect.soft(homepage.tools).toContainText("Tools");
    await expect.soft(homepage.documentation).toContainText("Documentation");
  });

  test("Content checks", async ({ page }) => {
    const homepage = await new DashboardPageAtomic(page);
    await expect.soft(homepage.contentHeader).toBeVisible();
    await expect
      .soft(homepage.contentHeader)
      .toHaveText("Vítej v testovací aplikaci Tredgate Project");
    await expect.soft(homepage.firstParagraph).toBeVisible();
    await expect
      .soft(homepage.firstParagraph)
      .toContainText(
        "Tato aplikace slouží pro trénink Software Testování a Automatizace testování"
      );
    await expect.soft(homepage.secondParagraph).toBeVisible();
    await expect
      .soft(homepage.secondParagraph)
      .toContainText(
        "Pokud budeš mít jakékoliv problémy, kontakuj Petra na: petr.fifka@tredgate.cz"
      );
  });
});
