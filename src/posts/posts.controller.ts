import type { Request, Response } from 'express';
import {
  getAllPosts,
  getBlogPost,
  createPost,
  deletePost,
} from './posts.repository';
import { AppError } from '../middleware/errorHandler';

export async function getAllPostsController(req: Request, res: Response) {
  const search = req.query?.search as string;

  try {
    let posts;

    if (search) {
      posts = await getAllPosts(search);
    } else {
      posts = await getAllPosts();
    }
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

export async function createPostController(req: Request, res: Response) {
  const title = req.body.title as string;
  const content = req.body.content as string;
  const category = req.body.category as string;
  const tags = (req.body.tags as number[]) ?? [];

  try {
    const post = await createPost(title, content, category, tags);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    throw new AppError('Failed to add new post', 400);
  }
}

export async function deletePostController(req: Request, res: Response) {
  const postId = req.params.postId as string;

  try {
    const result = await deletePost(postId);

    if (result === 0) {
      res.status(404).json('No posts found');
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.error(error);
    throw new AppError(`Failed to delete the post with ID ${postId}`, 500);
  }
}
