import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("GET Request", async ({ request }) => {
  await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/train");
});

test("GET Request with URL Parameter", async ({ request }) => {
  await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/eshop", {
    params: {
      userId: 410,
    },
  });
});

test("GET request with header", async ({ request }) => {
  await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train/header",
    {
      headers: {
        train: "Playwright hlavicky",
      },
    }
  );
});

test("POST with Body", async ({ request }) => {
  const username = faker.internet.username();
  const email = faker.internet.exampleEmail();

  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username: username,
        email: email,
        password: "123456",
      },
    }
  );
});

test("Reuse data between api calls", async ({ request }) => {
  // * Provolání autorizačního requestu a uložení response do proměnné
  const authResponse = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      data: {
        username: "admin",
        password: "password123",
      },
    }
  );

  // * Vytažení body z response a uložení do proměnné
  const responseBody = await authResponse.json();
  // * Z body vytáhneme property token
  const token = responseBody.token;

  // * Příprava body (dat) do budoucího requestu
  const data = {
    firstname: "James",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };

  // * Příprava autorizační hlavičky
  const headers = {
    Cookie: "token=" + token,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  await request.put("https://restful-booker.herokuapp.com/booking/1182", {
    headers: headers,
    data: data,
  });
});
