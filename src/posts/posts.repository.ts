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

export async function createPost(
  title: string,
  content: string,
  category: string,
  tags: number[],
) {
  try {
    const post = await pool.query(
      `
            INSERT INTO post (title, content, category) VALUES
            ($1, $2, $3)
            RETURNING id;`,
      [title, content, category],
    );

    const postId = post.rows[0].id;

    if (tags.length != 0) {
      for (let tag of tags) {
        await pool.query(
          `INSERT INTO post_tags(post_id, tag_id) VALUES ($1, $2);`,
          [postId, tag],
        );
      }
    }

    const result = await pool.query(
      `
            SELECT p.id, p.title, p.content, p.category, 
            COALESCE(array_agg(t.name) FILTER (WHERE t.name IS NOT NULL), '{}') AS tags
            FROM post p
            LEFT JOIN post_tags pt ON pt.post_id = p.id
            LEFT JOIN tags t ON t.id = pt.tag_id
            WHERE p.id = $1
            GROUP BY p.id;`,
      [postId],
    );

    return result.rows;
  } catch (error) {
    console.error(error);
    throw new AppError('Failed to add new post', 400);
  }
}
