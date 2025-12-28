import _ from "lodash";
import generatePosts from "../utils.js";

export default (app) => {
  const posts = generatePosts();

  // BEGIN (write your solution here)
  const POSTS_PER_PAGE = 5;

  app.get("/posts/:id", async (request, reply) => {
    const { id } = request.params;
    
    const post = posts.find(p => {
      return p.id == id ||
             String(p.id) === String(id) ||
             p.id === parseInt(id) ||
             String(p.id) === id;
    });

    if (!post) {
      reply.code(404);
      return "Page not found";
    }

    return reply.view("src/views/posts/show", { post });
  });

  app.get("/posts", async (request, reply) => {
    let { page = 1 } = request.query;
    page = parseInt(page, 10);

    if (page < 1 || isNaN(page)) {
      page = 1;
    }

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    let postsToShow = [];
    if (page <= totalPages) {
      const startIndex = (page - 1) * POSTS_PER_PAGE;
      const endIndex = Math.min(startIndex + POSTS_PER_PAGE, totalPosts);
      postsToShow = posts.slice(startIndex, endIndex);
    }

    return reply.view("src/views/posts/index", {
      posts: postsToShow,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });
  });
  // END
};
