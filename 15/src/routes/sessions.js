import generateUsers, { decrypt } from "../utils.js";

export default (app) => {
  const users = generateUsers();

  // BEGIN (write your solution here)
  app.get("/sessions/new", (req, res) => {
    const error = req.query.error;
    return res.view("src/views/sessions/new.pug", { error });
  });

  app.post("/sessions", (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find((u) => u.username === username);
    
    if (!user) {
      return res.redirect("/sessions/new?error=Wrong%20username%20or%20password");
    }
    
    const decryptedPassword = decrypt(user.password);
    
    if (decryptedPassword !== password) {
      return res.redirect("/sessions/new?error=Wrong%20username%20or%20password");
    }
    
    // Сохраняем в сессии только имя пользователя
    req.session.username = user.username;
    
    return res.redirect("/");
  });

  app.post("/sessions/delete", (req, res) => {
    // Удаляем сессию
    req.session.destroy();
    return res.redirect("/");
  });
  // END
};
