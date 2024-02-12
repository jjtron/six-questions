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

  export async function insertRecord(data: FormData) {
    // prepare the whos for insert
    let persons: number[] = [];
    data.getAll("who").map((person: any) => {
      persons.push(Number(person));
    });
    // prepare the whens for insert
    let timestamp: {date?: string; time?: string;} = {};
    data.getAll("when").map((property: any) => {
      console.log(property);
      const re = new RegExp(/\d{2}\/\d{2}\/\d{4}/);
      re.test(property) ? (timestamp.date = property) : (timestamp.time = property);
    });
    // prepare the wheres for insert
    let places: number[] = [];
    data.getAll("where").map((place: any) => {
      places.push(Number(place));
    });
    console.log(places);
    

    const result: any = await client.query(`
    INSERT INTO public.six_questions(
      id, who, what, "where", "when", why, how)
      VALUES (
        '${data.get("id")}',
        '${JSON.stringify(persons)}',
        '${data.get("what")}',
        '${JSON.stringify(places)}',
        '${JSON.stringify(timestamp)}',
        '${data.get("why")}',
        '${data.get("how")}'
      );`
    );
    console.log('RESULT', result);
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

    EXAMPLE SCRIPT FOR INSERTING DATA
    INSERT INTO six_questions (id, who, what, "where", "when", why, how)
    VALUES ('1274b03e-f668-4858-b169-62de4c596020',
		'{"value0": 0}', 'value3', '{"value1": 0}',
		'{"value2": 0}', 'value4', 'value5');
*/