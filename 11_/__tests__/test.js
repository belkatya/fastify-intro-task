import getPosts from "../src/utils.js";
import build from "../src/server.js";

const posts = getPosts();

test("Posts index", async () => {
  const app = await build();

  const response = await app.inject({
    method: "GET",
    url: "/posts",
  });

  expect(response.statusCode).toBe(200);

  expect(response.body).toContain(posts[0].title);

  expect(response.body).toContain(posts[1].title);

  expect(response.body).toContain(posts[2].title);

  expect(response.body).toContain(posts[3].title);

  expect(response.body).toContain(posts[4].title);

  expect(response.body).not.toContain(posts[5].title);

  expect(response.body).not.toContain(posts.at(-1).title);

  expect(response.body).toContain("/posts?page=2");
});

test("Posts index. Page 2", async () => {
  const app = await build();

  const response = await app.inject({
    method: "GET",
    url: "/posts?page=2",
  });

  expect(response.statusCode).toBe(200);

  expect(response.body).toContain(posts[5].title);

  expect(response.body).toContain(posts[6].title);

  expect(response.body).toContain(posts[7].title);

  expect(response.body).toContain(posts[8].title);

  expect(response.body).toContain(posts[9].title);

  expect(response.body).not.toContain(posts[4].title);

  expect(response.body).not.toContain(posts[10].title);
  expect(response.body).toContain("/posts?page=1");
  expect(response.body).toContain("/posts?page=3");
});

test("Posts index. Last page", async () => {
  const app = await build();

  const response = await app.inject({
    method: "GET",
    url: "/posts?page=20",
  });

  expect(response.statusCode).toBe(200);

  expect(response.body).toContain(posts.at(-1).title);

  expect(response.body).toContain(posts.at(-2).title);

  expect(response.body).toContain(posts.at(-3).title);

  expect(response.body).toContain(posts.at(-4).title);

  expect(response.body).toContain(posts.at(-5).title);

  expect(response.body).not.toContain(posts.at(-6).title);

  expect(response.body).not.toContain(posts[0].title);
});

test("Posts index. Empty", async () => {
  const app = await build();

  const response = await app.inject({
    method: "GET",
    url: "/posts?page=99",
  });

  expect(response.statusCode).toBe(200);

  expect(response.body).not.toContain(posts.at(-1).title);

  expect(response.body).not.toContain(posts.at(-2).title);

  expect(response.body).not.toContain(posts.at(-3).title);

  expect(response.body).not.toContain(posts.at(-4).title);

  expect(response.body).not.toContain(posts.at(-5).title);

  expect(response.body).not.toContain(posts.at(-6).title);

  expect(response.body).not.toContain(posts[0].title);
});

test("Post view", async () => {
  const app = await build();
  const post = posts[40];

  const response = await app.inject({
    method: "GET",
    url: `/posts/${post.id}`,
  });

  expect(response.statusCode).toBe(200);

  expect(response.body).toContain(post.title);
  expect(response.body).toContain(post.body);
});
