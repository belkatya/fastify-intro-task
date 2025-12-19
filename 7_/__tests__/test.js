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

test("Get users", async () => {
  const app = await build();
  const term = "co";

  const response = await app.inject({
    method: "GET",
    url: `users?term=${term}`,
  });

  expect(response.statusCode).toBe(200);

  const filtered = users.filter((u) => u.username.toLowerCase().includes(term));
  filtered.forEach((user) => {
    expect(response.body).toContain(user.username);
  });
  const rest = users.filter((u) => !u.username.toLowerCase().includes(term));
  rest.forEach((user) => {
    expect(response.body).not.toContain(user.username);
  });
});
