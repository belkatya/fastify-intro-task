import build, { data } from "../src/server.js";

const routes = ["phones", "domains"];

test.each(routes)("Check %s", async (route) => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: `/${route}`,
  });

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toEqual(data[route]);
});
