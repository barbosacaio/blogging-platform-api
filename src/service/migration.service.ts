import { promises as fs } from 'fs';
import path from 'path';
import pool from '../database/pool';

const migrationsPath = path.join(process.cwd(), 'migrations');

export async function migrate(): Promise<void> {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

  const files = (await fs.readdir(migrationsPath))
    .filter((file) => file.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const migration = await pool.query(
      'SELECT 1 FROM migrations WHERE name = $1',
      [file],
    );

    if (migration.rowCount && migration.rowCount > 0) {
      continue;
    }

    const sql = await fs.readFile(path.join(migrationsPath, file), 'utf-8');

    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO migrations(name) VALUES($1)', [file]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
