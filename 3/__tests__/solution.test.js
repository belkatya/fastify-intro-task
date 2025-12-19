import getUsers from "../src/utils.js";
import build from "../src/server.js";

const users = getUsers();

test("Default users page", async () => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: "/users",
  });

  const expected = users.slice(0, 5);

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toEqual(expected);
});

test("Users page 2", async () => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: "/users?page=2&per=8",
  });

  const expected = users.slice(8, 16);

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toEqual(expected);
});

test("Users last page", async () => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: "/users?page=10&per=10",
  });

  const expected = users.slice(-10);

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toEqual(expected);
});
