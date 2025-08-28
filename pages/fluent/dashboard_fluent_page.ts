import { expect, Locator, Page, test } from "@playwright/test";
import { LoginFluentPage } from "./login_fluent_page.ts";

export class DashboardFluentPage {
  readonly page: Page;
  readonly bellIcon: Locator;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bellIcon = page.locator("#user_notifications_report i");
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
  }

  async logout(): Promise<LoginFluentPage> {
    await test.step("Logout from Pmtool", async () => {
      await expect(this.bellIcon).toBeVisible(); // Čekání na načtení dashboardu
      await this.profileButton.click();
      await this.logoutButton.click();
    });
    return new LoginFluentPage(this.page);
  }
}
