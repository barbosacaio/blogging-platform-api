import pool from '../database/pool';
import { AppError } from '../middleware/errorHandler';

export interface updatePostDTO {
  title?: string;
  content?: string;
  category?: string;
}

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

export async function updatePost(postId: string, dto: updatePostDTO) {
  const post = await (
    await pool.query(`SELECT * FROM post WHERE id = $1;`, [postId])
  ).rows[0];

  if (!post) {
    throw new AppError(`No post found with ID ${postId}`, 404);
  }

  if (dto.title !== undefined) {
    post.title = dto.title;
  }

  if (dto.content !== undefined) {
    post.content = dto.content;
  }

  if (dto.category !== undefined) {
    post.category = dto.category;
  }

  try {
    const result = await pool.query(
      `
                UPDATE post
                SET
                    title = $1,
                    content = $2,
                    category = $3
                WHERE id = $4
                RETURNING *;
            `,
      [post.title, post.content, post.category, postId],
    );

    return result.rows;
  } catch (error) {
    console.error(error);
    throw new AppError(`Failed to update the post with ID ${postId}`, 500);
  }
}

export async function deletePost(postId: string) {
  try {
    const post = await pool.query(`DELETE FROM post WHERE id = $1;`, [postId]);

    return post.rowCount;
  } catch (error) {
    console.error(error);
    throw new AppError(`Failed to delete the post with ID ${postId}`, 500);
  }
}
