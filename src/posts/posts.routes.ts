import { Router } from 'express';
import { getAllPostsController, getPostController } from './posts.controller';

const router = Router();

router.get('/', getAllPostsController);
router.get('/:postId', getPostController);

export { router as postRoutes };
