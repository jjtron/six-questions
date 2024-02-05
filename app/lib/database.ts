import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'moongov',
    password: '',
    port: 5432,
  });
  client.connect();

  export async function mutateData(q: any) {
    try {
      const result: any = await client.query(q);
      return {success: true, details: result};
    } catch(error: any) {
      return {succes: false, details: error};
    }
  };

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
*/