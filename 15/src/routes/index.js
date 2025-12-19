import users from "./sessions.js";

const controllers = [users];

export default (app) => controllers.forEach((f) => f(app));
