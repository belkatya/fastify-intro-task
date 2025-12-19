import _ from "lodash";
import fastify from "fastify";
import getUsers from "./utils.js";

export default () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.get("/users", (req, res) => {
    let { page = 1, per = 5 } = req.query;
    page = parseInt(page);
    per = parseInt(per);
    const startIndex = (page - 1) * per;
    const endIndex = startIndex + per;
    const paginatedUsers = users.slice(startIndex, endIndex);
    res.send(paginatedUsers);
  });
  // END

  return app;
};
