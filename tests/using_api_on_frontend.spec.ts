//using_api_on_frontend.spec.ts
import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Register user in TEG#B and check API", async ({ page }) => {
  const username = faker.internet.username();
  const email = faker.internet.exampleEmail();
  const password = "123456";

  // * Registrace uživatele pomocí frontendu
  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/register");
  await page.locator('[data-testid="email-input"]').fill(email);
  await page.locator('[data-testid="password-input"]').fill(password);
  await page.locator('[data-testid="username-input"]').fill(username);

  // * Zapínáme čekání na HTTP Request (API) a jeho odpověď - nepoužíváme await, protože chceme aby test pokračoval kliknutím na tlačítko - tím se api pošle
  const responsePromise = page.waitForResponse(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/register"
  );
  // * Klikneme na tlačítko Registrovat, abychom spustili registrační request
  await page.locator('[data-testid="submit-button"]').click(); // API se pošle po kliknutí
  // * Počkáme na získání response a uložíme celý request do proměnné
  const response = await responsePromise;
  console.log(responsePromise);

  // * Testování Request části API register (požadavek)
  const registerRequest = response.request();
  const registerReqBody = await registerRequest.postDataJSON();
  // Testy request body, že data, která jsme zadávali do formuláře jsou stejná i v API requestu
  expect(registerReqBody.email, "registerReqBody.email is correct").toBe(email);
  expect(registerReqBody.password, "registerReqBody.password is correct").toBe(
    password
  );
  expect(registerReqBody.username, "registerReqBody.username is correct").toBe(
    username
  );

  // * Testování Response části API register (odpověď)
  const responseBody = await response.json();
  expect(
    responseBody.username,
    "Register responseBody.username is correct"
  ).toBe(username);
});
