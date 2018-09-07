import User from './user.controller';

const userRouter = (router) => {
  router.route('/')
    .get(User.getUsers);

  return router;
};

export default userRouter;
