import { Router } from 'express';
import { getAllPostsController } from './posts.controller';

const router = Router();

router.get('/', getAllPostsController);

export { router as postRoutes };
