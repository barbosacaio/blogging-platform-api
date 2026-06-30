import type { Request, Response } from 'express';
import { getAllPosts } from './posts.repository';
import { AppError } from '../middleware/errorHandler';

export async function getAllPostsController(req: Request, res: Response) {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    throw new AppError('Failed to get all posts', 500);
  }
}
