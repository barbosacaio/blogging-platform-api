import { Router } from 'express';
import {
  getAllPostsController,
  getPostController,
  createPostController,
} from './posts.controller';

const router = Router();

router.get('/', getAllPostsController);
router.get('/:postId', getPostController);
router.post('/', createPostController);

export { router as postRoutes };
