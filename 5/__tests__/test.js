import getUsers from "../src/utils.js";
import build from "../src/server.js";

const users = getUsers();

test("Users index", async () => {
  const app = await build();

  const response = await app.inject({
    method: "GET",
    url: "/users",
  });

  expect(response.statusCode).toBe(200);

  expect(response.body).toContain(users[0].username);
  expect(response.body).toContain(users[0].email);

  expect(response.body).toContain(users[50].username);
  expect(response.body).toContain(users[50].email);

  expect(response.body).toContain(users.at(-1).username);
  expect(response.body).toContain(users.at(-1).email);
});

test("Get user", async () => {
  const app = await build();
  const userIndex = 75;

  const response = await app.inject({
    method: "GET",
    url: `users/${users[userIndex].id}`,
  });

  expect(response.statusCode).toBe(200);
  expect(response.body).toContain(users[userIndex].username);
  expect(response.body).toContain(users[userIndex].email);
});

test("Undefined user", async () => {
  const app = await build();

  const response = await app.inject({
    method: "GET",
    url: "users/undefined",
  });

  const expected = "User not found";

  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual(expected);
});
