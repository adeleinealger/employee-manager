import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432,
});

export default class DB {
    static async connectToDb(): Promise<void> {
        try {
          await pool.connect();
          // console.log all roles from database
          const res = await pool.query('SELECT * FROM role');
          console.log('Roles:', res.rows);
          console.log('Connected to the database.');
        } catch (err) {
          console.error('Error connecting to database:', err);
          process.exit(1);
        }
    }
}