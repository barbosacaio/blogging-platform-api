import { Router } from 'express';
import {
  getAllPostsController,
  getPostController,
  createPostController,
  deletePostController,
} from './posts.controller';

const router = Router();

router.get('/', getAllPostsController);
router.get('/:postId', getPostController);
router.post('/', createPostController);
router.delete('/:postId', deletePostController);

export { router as postRoutes };
