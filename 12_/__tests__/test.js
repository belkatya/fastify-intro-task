import build from "../src/server.js";

test("Posts index", async () => {
  const app = await build();

  const response = await app.inject({
    method: "GET",
    url: "/posts/new",
  });

  expect(response.statusCode).toBe(200);
});

test("Posts index. Page 2", async () => {
  const app = await build();
  const post = { title: "title", body: "post body" };

  await app.inject({
    method: "POST",
    url: "/posts",
    payload: {
      ...post,
    },
  });

  const response2 = await app.inject({
    method: "GET",
    url: "/posts/1",
  });

  expect(response2.body).toContain(post.title);

  expect(response2.body).toContain(post.body);

  await app.inject({
    method: "POST",
    url: "/posts/1",
    payload: {
      ...{ title: "new title", body: "new body" },
    },
  });

  const response3 = await app.inject({
    method: "GET",
    url: "/posts/1",
  });

  expect(response3.body).toContain("new title");

  expect(response3.body).toContain("new body");
});
