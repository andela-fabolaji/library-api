import { Post } from './post.controller';
import { asyncWrap } from '../../lib';

export const postRouter = (router) => {
  router.route('/')
    .get(asyncWrap(Post.index))
    .post(asyncWrap(Post.new));
  
  router.route('/:id')
    .get(asyncWrap(Post.show))
    .put(asyncWrap(Post.update))
    .delete(asyncWrap(Post.destroy))

  return router;
};
