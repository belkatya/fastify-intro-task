import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import formbody from "@fastify/formbody";
import yup from "yup";
import { generateId } from "./utils.js";

export default async () => {
  const app = fastify();

  const articles = [];

  await app.register(view, { engine: { pug } });
  await app.register(formbody);

  app.get("/", (req, res) => res.view("src/views/index"));

  app.get("/articles", (req, res) => {
    res.view("src/views/articles/index", { articles });
  });

  // BEGIN (write your solution here)
  
  app.get("/articles/new", (req, res) => {
  res.view("src/views/articles/new");
});

  app.post('/articles', {
    attachValidation: true,
    schema: {
      body: yup.object({
        title: yup.string().min(2, 'Название не должно быть короче двух символов'),
        text: yup.string().min(10, 'Статья должна быть не короче 10 символов'),
      })
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => (data) => {
      const existingArticle = articles.find(article => article.title === data.title);
      if (existingArticle) {
        return {
          error: new Error('Статья с таким названием уже существует')
        };
      }

      try {
        const result = schema.validateSync(data);
        return { value: result };
      } catch (e) {
        return { error: e };
      }
    },
  }, (req, res) => {
    const { title, text } = req.body;

    if (req.validationError) {
      const data = {
        title,
        text,
        error: req.validationError,
      };

      return res.view('src/views/articles/new', data);
    }

    const article = {
      id: generateId(),
      title,
      text,
    };

    articles.push(article);

    return res.redirect('/articles');
  });

  // END

  app.get("/articles/:id", (req, res) => {
    const article = articles.find(({ id }) => id === req.params.id);

    if (!article) {
      return res.status(404).send("article not found");
    }

    return res.view("src/views/articles/show", { article });
  });

  return app;
};
