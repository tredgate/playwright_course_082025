import { test } from "@playwright/test";
import path from "path";

test("Click with Options", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  await page.locator("#username").fill("playwright_jaro24");
  await page.locator("#password").fill("Playwright!2024");
  await page.locator(".btn").click({ position: { x: 25, y: 10 } }); // ? Předáváme options object - dodatečnou konfigurace klikací metodě
});

test("fill and pressSequentially", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  await page.locator("#username").fill("Start");
  await page.locator("#username").fill("End"); // ? fill vždy nahrazuje již existující hodnotu uvnitř pole
  await page.locator("#username").pressSequentially("Kde toto bude?"); // ? pressSequentially nikdy nepřepisuje původní hodnotu, skončíme s textem: EndKde toto bude?
  await page.locator("#username").clear(); // ? Vyčistí hodnotu pole
  await page
    .locator("#username")
    .pressSequentially("Dlouhý text", { delay: 500 });
});

test("Select Option by selectOption", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  await page.locator("#gender").selectOption("male"); // ? Výběr hodnoty ze selectu pomocí atributu value - <option value="male">
  await page.locator("#gender").selectOption({ label: "Female" }); // ? Výběr hodnoty ze selectu pomocí textu - <option>Female</option>
});

test("Radio, Checkboxes check", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  // * Radio button
  await page.locator("#contact-phone").check();

  // * Checkboxes
  await page.locator("#interests-sports").check(); // ? Zakliknutí checkboxu
  await page.locator("#interests-music").check();
  await page.locator("#interests-music").uncheck(); // ? Odkliknutí checkboxu
});

test("Date Input fill", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  await page.locator("#date-of-birth").fill("1948-08-30"); // ? Input type date musíme vždy vyplňovat ve formátu YYYY-MM-dd (1999-01-15) - jiný formát nebude fungovat
});

test("File Upload Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  const filePath = path.resolve(__dirname, "../assets/upload_file.txt");
  // ? Následující kód je pouze k tomu, aby nám vscode našeptal cestu
  // require("../assets/upload_file.txt");

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.locator("#file-upload").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(filePath);

  // ? Čekání 2 sec na to, abychom viděli, že se soubor přidal
  await page.waitForTimeout(2000); // ! Toto je implicitní čekání, v kódu bychom se mu měli pokud možno vyhnout!
});

test("Slider - range", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  const slider = page.locator("#experience");
  await slider.fill("3");
  await slider.fill("9");
  await slider.fill("5");
});

test("Mouse Hover", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  await page.locator("#hover-box").hover();
});
