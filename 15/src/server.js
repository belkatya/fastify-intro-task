import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import formbody from "@fastify/formbody";
import fastifyCookie from "@fastify/cookie";
import session from "@fastify/session";
import addRoutes from "./routes/index.js";

export default async () => {
  const app = fastify();

  await app.register(view, { engine: { pug } });
  await app.register(formbody);
  await app.register(fastifyCookie);

  await app.register(session, {
    secret: "a secret with minimum length of 32 characters",
    cookie: {
      secure: false,
    },
  });

  app.get("/", (req, res) => {
    const { username } = req.session;
    res.view("src/views/index", { username });
  });

  addRoutes(app);

  return app;
};
