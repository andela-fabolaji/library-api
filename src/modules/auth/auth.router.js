import { Auth } from './auth.controller';
import { asyncWrap } from '../../lib';

export const authRouter = (router) => {
  router.post('/signup', asyncWrap(Auth.signup));
  router.post('/signin', asyncWrap(Auth.signin));

  return router;
};
