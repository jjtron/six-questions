import { Client } from 'pg';
import { unstable_noStore as noStore } from 'next/cache';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'questions',
    password: '',
    port: 5432,
  });
  client.connect();

  export async function getDbData(q: any) {

  /*
  // SIMULATE A LONG WAIT FOR DATA
  if (q.startsWith('SELECT * FROM wheres')) {
    await new Promise((resolve) => setTimeout(resolve, 4000));
  }
  */

    try {
      const result: any = await client.query(q);
      return {success: true, details: result};
    } catch(error: any) {
      return {succes: false, details: error};
    }
  };

  export async function insertAnswerRecord(data: FormData) {
    // prepare the whos for insert
    let persons: number[] = [];
    data.getAll("who").map((person: any) => {
      persons.push(Number(person));
    });
    // prepare the whens for insert
    let timestamp: {date?: string; time?: string;} = {};
    data.getAll("when").map((property: any) => {
      const re = new RegExp(/\d{2}\/\d{2}\/\d{4}/);
      re.test(property) ? (timestamp.date = property) : (timestamp.time = property);
    });
    // prepare the wheres for insert
    let places: number[] = [];
    data.getAll("where").map((place: any) => {
      places.push(Number(place));
    });
    
    const result: any = await client.query(`
    INSERT INTO public.six_questions(
      id, who, what, "where", "when", why, how)
      VALUES (
        '${data.get("id")}',
        '${JSON.stringify(persons)}',
        '${data.get("what")}',
        '${data.get("where")}',
        '${JSON.stringify(timestamp)}',
        '${data.get("why")}',
        '${data.get("how")}'
      );`
    );
  };

  export async function updateAnswerRecord(data: FormData) {
    // prepare the whos for update
    let persons: number[] = [];
    data.getAll("who").map((person: any) => {
      persons.push(Number(person));
    });
    // prepare the whens for update
    let timestamp: {date?: string; time?: string;} = {};
    data.getAll("when").map((property: any) => {
      const re = new RegExp(/\d{2}\/\d{2}\/\d{4}/);
      re.test(property) ? (timestamp.date = property) : (timestamp.time = property);
    });
    // prepare the wheres for update
    let places: number[] = [];
    data.getAll("where").map((place: any) => {
      places.push(Number(place));
    });

    const result: any = await client.query(`
    UPDATE public.six_questions
	    SET
      who='${JSON.stringify(persons)}',
      what='${data.get("what")}',
      "when"='${JSON.stringify(timestamp)}',
      "where"='${data.get("where")}',
      why='${data.get("why")}',
      how='${data.get("how")}'
	    WHERE id = '${data.get("id")}';`
    );
  };

  export async function insertPlaceRecord(data: FormData) {
    const result: any = await client.query(`
      INSERT INTO public.wheres ( name, details )
      VALUES (
        '${data.get("placename")}',
        '${JSON.stringify({ 
          city: data.get("city"),
          street: data.get("street"),
          state: data.get("state")
        })}'
      );`
    );
  }

  export async function updatePlaceRecord(data: FormData) {
    const result: any = await client.query(`
      UPDATE public.wheres
      SET name='${data.get('placename')}',
          details='${JSON.stringify({ 
            city: data.get("city"),
            street: data.get("street"),
            state: data.get("state")
          })}'
      WHERE id = '${data.get('id')}';`
    );
  }

  const ITEMS_PER_PAGE = 1;
  export async function fetchFilteredRecords(
    query: string,
    currentPage: number,
  ) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const answers = await client.query(
        `SELECT id, who, what, "where", "when", why, how
        FROM public.six_questions
        WHERE what ILIKE '%${query}%' OR
            why ILIKE '%${query}%' OR
            how ILIKE '%${query}%'
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};`
        );

      return answers.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch answers.');
    }
  }
  export async function fetchRecordsPages(query: string) {
    noStore();
    try {
      const count = await client.query(
       `SELECT COUNT(*)
        FROM public.six_questions
        WHERE what ILIKE '%${query}%' OR
            why ILIKE '%${query}%' OR
            how ILIKE '%${query}%';
    `);
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of answers.');
    }
  }


  const ITEMS_PER_PAGE_OF_PLCES_TABLE = 20;
  export async function fetchFilteredPlaces(
    query: string,
    currentPage: number,
  ) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
      const answers = await client.query(
       `SELECT * FROM public.wheres
        WHERE name ILIKE '%${query}%' OR
            details->>'street' ILIKE '%${query}%' OR
            details->>'city' ILIKE '%${query}%' OR
            details->>'state' ILIKE '%${query}%'
            LIMIT ${ITEMS_PER_PAGE_OF_PLCES_TABLE} OFFSET ${offset};`
        );

      return answers.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch answers.');
    }
  }

  export async function fetchRecordsPlaces(query: string) {
    noStore();
    try {
      const count = await client.query(
       `SELECT COUNT(*)
        FROM public.wheres
        WHERE name ILIKE '%${query}%' OR
              details->>'street' ILIKE '%${query}%' OR
              details->>'city' ILIKE '%${query}%' OR
              details->>'state' ILIKE '%${query}%';
    `);
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE_OF_PLCES_TABLE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of answers.');
    }
  }

/* 
SCRIPT TO CREATE TABLE "six_questions"

    DROP TABLE IF EXISTS public.six_questions;
    CREATE TABLE IF NOT EXISTS public.six_questions
    (
        id uuid NOT NULL,
        who json NOT NULL,
        what character varying(2000) COLLATE pg_catalog."default" NOT NULL,
        "where" integer NOT NULL,
        "when" json NOT NULL,
        why character varying(500) COLLATE pg_catalog."default" NOT NULL,
        how character varying(1000) COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT six_questions_pkey PRIMARY KEY (id)
    )
    TABLESPACE pg_default;
    ALTER TABLE IF EXISTS public.six_questions
        OWNER to postgres;

/////////////////////////////////////////////////////////////////////////
SCRIPT TO CREATE TABLE "wheres"

    DROP TABLE IF EXISTS public.wheres;
    CREATE TABLE IF NOT EXISTS public.wheres
    (
        id integer NOT NULL DEFAULT nextval('wheres_id_seq'::regclass),
        name character varying(50) COLLATE pg_catalog."default" NOT NULL,
        details json NOT NULL,
        CONSTRAINT wheres_pkey PRIMARY KEY (id)
    )
    TABLESPACE pg_default;
    ALTER TABLE IF EXISTS public.wheres
        OWNER to postgres;


/////////////////////////////////////////////////////////////////////////
SCRIPT TO CREATE TABLE "whos"

    DROP TABLE IF EXISTS public.whos;
    CREATE TABLE IF NOT EXISTS public.whos
    (
        index integer NOT NULL,
        name character varying(80) COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT whos_pkey PRIMARY KEY (index)
    )
    TABLESPACE pg_default;
    ALTER TABLE IF EXISTS public.whos
        OWNER to postgres;
*/