import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import formbody from "@fastify/formbody";
import fastifyCookie from "@fastify/cookie";
import session from "@fastify/session";
import flash from "@fastify/flash";
import { plugin as fastifyReverseRoutes } from "fastify-reverse-routes";

import addRoutes from "./routes/index.js";

export default async () => {
  const app = fastify({ exposeHeadRoutes: false });

  await app.register(fastifyReverseRoutes);

  const route = (name, placeholdersValues) =>
    app.reverse(name, placeholdersValues);

  await app.register(view, {
    engine: { pug },
    defaultContext: {
      route,
    },
  });

  await app.register(formbody);
  await app.register(fastifyCookie);

  await app.register(session, {
    secret: "a secret with minimum length of 32 characters",
    cookie: {
      secure: false,
    },
  });

  await app.register(flash);

  app.get("/", { name: "home" }, (req, res) => {
    const { username } = req.session;
    res.view("src/views/index", { username });
  });

  addRoutes(app);

  return app;
};
