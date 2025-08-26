import { expect, test } from "@playwright/test";

test("Exercise: API Asserts", async ({ request }) => {
  const response = await request.patch(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );

  const responseBody = await response.json();
  expect(
    typeof responseBody.timestamp,
    "responseBody.timestamp is a string"
  ).toBe("string");
  expect(responseBody.id, "responseBody.id have value").toBe(1);
});
