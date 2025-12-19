import build from "../src/server.js";

test("Run server", async () => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: "/",
  });

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual("Welcome to Fastify!");
});
