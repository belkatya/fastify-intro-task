/* eslint-disable @typescript-eslint/naming-convention */
import build from "../src/server.js";

test("Add user", async () => {
  const app = await build();

  const user = {
    firstName: "first name",
    lastName: "last name",
    email: "test@email",
  };

  const response1 = await app.inject({
    method: "POST",
    url: "/users",
    payload: {
      ...user,
    },
  });

  const response2 = await app.inject({
    method: "GET",
    url: "/users/1",
  });

  expect(response2.body).toContain("User not found");

  const token = response1.cookies.find((item) => item.name === "token");

  const response3 = await app.inject({
    method: "GET",
    url: "/users/1",
    cookies: {
      token: token.value,
    },
  });

  expect(response3.body).toContain(user.firstName);
  expect(response3.body).toContain(user.lastName);
  expect(response3.body).toContain(user.email);
});
