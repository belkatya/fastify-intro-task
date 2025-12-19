import getCompanies from "../src/utils.js";
import build from "../src/server.js";

const companies = getCompanies();

test("Get company 1", async () => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: `/companies/${companies[0].id}`,
  });

  const expected = companies[0];

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toEqual(expected);
});

test("Get company 2", async () => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: `/companies/${companies[50].id}`,
  });

  const expected = companies[50];

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toEqual(expected);
});

test("Get company 3", async () => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: "/companies/unknown",
  });

  const expected = "Company not found";

  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual(expected);
});
