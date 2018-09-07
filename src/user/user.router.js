const User = require('./user.controller');

const userRouter = (router) => {
  router.route('/')
    .get(User.getUsers);

  return router;
};

export default userRouter;
