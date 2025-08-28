import { Locator, Page } from "@playwright/test";
import { DashboardFluentPage } from "./dashboard_fluent_page.ts";

export class LoginFluentPage {
  // * Property - "proměnné" pro lokátory, page a url
  readonly page: Page;
  readonly url = "https://tredgate.com/pmtool";
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // * Constructor - Nastavení lokátorů a page - constructor se spouští vždy při vytváření objektu
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator(".btn");
  }

  // * Metody - pojmenované akce/skupiny akcí na stránce
  async openPmtool(): Promise<this> {
    await this.page.goto(this.url);
    return this;
  }

  async fillUsername(username: string): Promise<this> {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string): Promise<this> {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLogin(): Promise<DashboardFluentPage> {
    await this.loginButton.click();
    return new DashboardFluentPage(this.page);
  }

  async login(
    username: string,
    password: string
  ): Promise<DashboardFluentPage> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
    return new DashboardFluentPage(this.page);
  }
}
