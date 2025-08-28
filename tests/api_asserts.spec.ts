// api_asserts.spec.ts
import { expect, test } from "@playwright/test";

test("Assert Response Status 200 OK", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );

  expect(response.status(), "GET eshop status is 200").toBe(200);
});

test("Assert Response Header", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );
  // * Postupné vytažení hlavičky content-type
  const headers = response.headers();
  console.log(headers);
  const contentType = headers["content-type"];
  expect(contentType, "Header content-type have value").toBe(
    "application/json; charset=utf-8"
  );
  expect(contentType, "Header content-type contain application/json").toContain(
    "application/json"
  );

  // * Vytažení a otestování hlavičky v jednom řádku (alternativa)
  expect(
    response.headers()["content-type"],
    "Header content-type have value"
  ).toBe("application/json; charset=utf-8");
});

test("Assert Response Body", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );

  // * Vytažení body response
  const responseBody = await response.json();

  // * Kontrola existence property (například userId)
  expect(responseBody.updatedAt).toBeDefined();

  // * Kontrola datového typu property (například number - číslo)
  expect(typeof responseBody.userId).toBe("number");

  // * Kontrola konkrétních dat
  expect(responseBody.email).toBe("petr.fifka@tredgate.cz");
});
