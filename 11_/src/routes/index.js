import posts from "./posts.js";

const controllers = [posts];

export default (app) => controllers.forEach((f) => f(app));
