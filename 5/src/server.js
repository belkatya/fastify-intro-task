import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import getUsers from "./utils.js";

export default async () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)

  // END

  return app;
};
