const authorCtrl = require('./author.controller');

const authorRouter = (router) => {
  router.route('/')
    .get(authorCtrl.getAuthors)
    .post(authorCtrl.createAuthor);

  return router;
};

module.exports = authorRouter;
