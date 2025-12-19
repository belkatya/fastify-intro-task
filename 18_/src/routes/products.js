export default (app, db) => {
  app.get("/products/new", (req, res) => {
    res.view("src/views/products/new");
  });

  // BEGIN (write your solution here)

  // END
};
