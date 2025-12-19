import products from "./products.js";

const controllers = [products];

export default (app, db) => controllers.forEach((f) => f(app, db));
