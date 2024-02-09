import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'questions',
    password: '',
    port: 5432,
  });
  client.connect();

  export async function getDbData(q: any) {
    try {
      const result: any = await client.query(q);
      return {success: true, details: result};
    } catch(error: any) {
      return {succes: false, details: error};
    }
  };
  export async function fetchCustomers() {
    try {
      const data = await client.query(`
        SELECT
          id,
          name
        FROM customers
        ORDER BY name ASC
      `);
  
      const customers = data.rows;
      return customers;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all customers.');
    }
  }

/* SCRIPT TO CREATE TABLE "six_questions"
    DROP TABLE IF EXISTS public.six_questions;

    CREATE TABLE IF NOT EXISTS public.six_questions
    (
      id uuid NOT NULL,
      who json NOT NULL,
      what character varying(2000) COLLATE pg_catalog."default" NOT NULL,
      "where" json NOT NULL,
      "when" json NOT NULL,
      why character varying(500) COLLATE pg_catalog."default" NOT NULL,
      how character varying(1000) COLLATE pg_catalog."default" NOT NULL
        
    )

    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS public.six_questions
        OWNER to postgres;

    EXAMPLE SCRIPT FOR INSERTING DATA
    INSERT INTO six_questions (id, who, what, "where", "when", why, how)
    VALUES ('1274b03e-f668-4858-b169-62de4c596020',
		'{"value0": 0}', 'value3', '{"value1": 0}',
		'{"value2": 0}', 'value4', 'value5');
*/