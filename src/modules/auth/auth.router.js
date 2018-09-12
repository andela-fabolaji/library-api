import { Auth } from './auth.controller';
import { asyncWrap } from '../../lib';

export const authRouter = (router) => {
  router.post('/signup', asyncWrap(Auth.signup));
  router.post('/signin', asyncWrap(Auth.signin));
  router.get('/verify', asyncWrap(Auth.verifyAccount));

  return router;
};
