import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import formbody from "@fastify/formbody";
import addRoutes from "./routes/index.js";

export default async () => {
  const app = fastify();

  await app.register(view, { engine: { pug } });
  await app.register(formbody);

  app.get("/", (req, res) => res.view("src/views/index"));

  addRoutes(app);

  return app;
};
