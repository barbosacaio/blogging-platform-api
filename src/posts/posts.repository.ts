import pool from '../database/pool';
import { AppError } from '../middleware/errorHandler';

export async function getAllPosts() {
  try {
    const posts = await pool.query(`SELECT * FROM post;`);
    return posts.rows;
  } catch (error) {
    console.error(error);
    throw new AppError('Failed to get all posts', 500);
  }
}

export async function getBlogPost(postId: string) {
  try {
    const post = await pool.query(`SELECT * FROM post WHERE id = ${postId}`);
    return post.rows;
  } catch (error) {
    console.error(error);
    throw new AppError(`Failed to get post with ID ${postId}`, 500);
  }
}
