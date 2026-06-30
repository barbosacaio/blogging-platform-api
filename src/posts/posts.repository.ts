import pool from '../database/pool';
import { AppError } from '../middleware/errorHandler';

export async function getAllPosts(search?: string) {
  try {
    let posts;

    if (search) {
      posts = await pool.query(
        `
            SELECT * FROM post WHERE
            title LIKE $1 OR
            content LIKE $1;
        `,
        [`%${search}%`],
      );
    } else {
      posts = await pool.query(`SELECT * FROM post;`);
    }
    return posts.rows;
  } catch (error) {
    console.error(error);
    throw new AppError('Failed to get posts', 500);
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
