const authorCtrl = require('./author.controller');

const authorRouter = (router) => {
  router.route('/')
    .get(authorCtrl.getAll)
    .post(authorCtrl.create);

  return router;
};

module.exports = authorRouter;
