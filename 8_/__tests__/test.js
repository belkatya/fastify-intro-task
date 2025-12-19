import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { minify } from "html-minifier";
import getUsers from "../src/utils.js";
import build from "../src/server.js";

const users = getUsers();

const getFixturePath = (filename) => path.join("__fixtures__", filename);
const readFixture = (filename) =>
  fs.readFileSync(getFixturePath(filename), "utf-8").trim();

const minifyHtml = (html) => minify(html, { collapseWhitespace: true });

test("Users index", async () => {
  const app = await build();

  const response = await app.inject({
    method: "GET",
    url: "/users",
  });

  expect(response.statusCode).toBe(200);

  expect(response.body).toContain(users[0].username.trim());
  expect(response.body).toContain(users[0].email.toLowerCase().trim());

  expect(response.body).toContain(users[50].username.trim());
  expect(response.body).toContain(users[50].email.toLowerCase().trim());

  expect(response.body).toContain(users.at(-1).username.trim());
  expect(response.body).toContain(users.at(-1).email.toLowerCase().trim());
});

test("Form", async () => {
  const app = await build();

  const response = await app.inject({
    method: "GET",
    url: "users/new",
  });

  expect(response.statusCode).toBe(200);

  const expected = minifyHtml(readFixture("form.html"));

  expect(minifyHtml(response.body)).toContain(expected);
});

test("Create user", async () => {
  const app = await build();

  const newUser = {
    username: "New User",
    email: "myEmail@domain.com",
    password: "12345",
  };

  const response1 = await app.inject({
    method: "POST",
    url: "/users",
    payload: {
      ...newUser,
      username: ` ${newUser.username} `,
      email: ` ${newUser.email} `,
    },
  });

  expect(response1.statusCode).toBe(302);

  const response2 = await app.inject({
    method: "GET",
    url: "/users",
  });

  expect(response2.statusCode).toBe(200);

  expect(response2.body).toContain(users[0].username.trim());
  expect(response2.body).toContain(users[0].email.toLowerCase().trim());

  expect(response2.body).toContain(users[50].username.trim());
  expect(response2.body).toContain(users[50].email.toLowerCase().trim());

  expect(response2.body).toContain(users.at(-1).username.trim());
  expect(response2.body).toContain(users.at(-1).email.toLowerCase().trim());

  expect(response2.body).toContain(newUser.username.trim());
  expect(response2.body).toContain(newUser.email.toLowerCase().trim());
});
