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