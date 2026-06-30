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
