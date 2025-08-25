import { test } from "@playwright/test";

test("Contact Us Cvičení", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/contact.html");
  await page.locator("#full-name").fill("Josef Novotný");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#contact-date").fill("2025-10-01");
  await page.locator("#role").selectOption("instructor");
  await page.locator("#comments").fill("Komentář 1234");
  await page.locator("#newsletter").check();
  await page.locator('[data-testid="button-submit"]').click();
});
