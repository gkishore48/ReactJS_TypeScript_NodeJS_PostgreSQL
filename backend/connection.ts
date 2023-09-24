import { Pool } from 'pg';

// create a new PostgreSQL  connection
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'root',
  database: 'nodejs_dashboard',
  port: 5432,
});


export default pool;