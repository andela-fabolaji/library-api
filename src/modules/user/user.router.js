import { User } from './user.controller';
import { asyncWrap } from '../../lib';

export const userRouter = (router) => {
  router.route('/')
    .get(asyncWrap(User.getUsers));

  return router;
};
