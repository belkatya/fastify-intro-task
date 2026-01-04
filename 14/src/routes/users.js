import { generateToken, buildIdGenerator } from "../utils.js";

export default (app) => {
  const users = [];

  const generateId = buildIdGenerator();

  app.get("/users/new", (req, res) => res.view("src/views/users/new"));

  // BEGIN (write your solution here)
  app.post("/users", (req, res) => {
    const { firstName, lastName, email } = req.body;
    const token = generateToken();
    const id = generateId();
    
    const user = { 
      id, 
      firstName, 
      lastName, 
      email, 
      token 
    };
    users.push(user);
    
    res
      .setCookie('token', token, { path: '/' })
      .redirect(`/users/${id}`);
  });

  app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const token = req.cookies?.token;
    
    const user = users.find(u => u.id === id);
    
    if (!user || user.token !== token) {
      return res.code(404).send('User not found');
    }
    
    return res.view("src/views/users/show", { user });
  });
  // END
};
