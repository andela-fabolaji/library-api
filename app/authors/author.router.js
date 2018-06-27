const { getAuthors, createAuthor } = require('./author.controller');

const authorRouter = (router) => {
  router.route('/')
    .get(getAuthors)
    .post(createAuthor);

  return router;
};

module.exports = authorRouter;
