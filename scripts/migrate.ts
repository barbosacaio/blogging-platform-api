import pool from '../src/database/pool'
import { migrate } from '../src/service/migration.service'

async function main() {
    try {
        await migrate()
        console.log('All migrations were executed.')
    } catch (error) {
        console.error(error)
        process.exitCode = 1
    } finally {
        await pool.end()
    }
}

main()