import type { Request, Response } from 'express';
import { getAllPosts, getBlogPost } from './posts.repository';
import { AppError } from '../middleware/errorHandler';

export async function getAllPostsController(req: Request, res: Response) {
  try {
    const posts = await getAllPosts();
    if (posts.length === 0) {
      res.status(404).json('No posts found');
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    console.error(error);
    throw new AppError('Failed to get all posts', 500);
  }
}

export async function getPostController(req: Request, res: Response) {
  const postId = req.params.postId as string;

  try {
    const post = await getBlogPost(postId);
    if (post.length === 0) {
      res.status(404).json(`No post found with ID ${postId}`);
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    console.error(error);
    throw new AppError(`Failed to get post with ID ${postId}`, 500);
  }
}
