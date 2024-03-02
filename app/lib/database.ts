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
    try {
      const result: any = await client.query(q);
      return {success: true, details: result};
    } catch(error: any) {
      return {succes: false, details: error};
    }
  };

  export async function insertPersonRecord(data: FormData) {
    const result: any = await client.query(`
      INSERT INTO public.people (name)
	    VALUES ('${data.get("name")}');
    `);
  }

  const PEOPLE_PER_PAGE = 10;
  export async function fetchFilteredPeople(
    query: string,
    currentPage: number,
  ) {
    noStore();
    const offset = (currentPage - 1) * PEOPLE_PER_PAGE;
  
    try {
      const answers = await client.query(
        `SELECT index, name
         FROM public.people
         WHERE name ILIKE '%${query}%'
            LIMIT ${PEOPLE_PER_PAGE} OFFSET ${offset};`
        );

      return answers.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch answers.');
    }
  }

  export async function fetchRecordsPeople(query: string) {
    noStore();
    try {
      const count = await client.query(
       `SELECT COUNT(*)
        FROM public.people
        WHERE name ILIKE '%${query}%';
    `);
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / PEOPLE_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of people.');
    }
  }

  export async function insertAnswerRecord(data: FormData) {
    // prepare the people for insert
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

    const result: any = await client.query(`
    INSERT INTO public.six_questions(
      id, who, what, "where", "when", why, how)
      VALUES (
        '${data.get("id")}',
        '${JSON.stringify(persons).replace('[', '{').replace(']', '}')}',
        '${data.get("what")}',
        '${data.get("where")}',
        '${JSON.stringify(timestamp)}',
        '${data.get("why")}',
        '${data.get("how")}'
      );`
    );
  };

  export async function updateAnswerRecord(data: FormData) {
    // prepare the people for update
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

    const result: any = await client.query(`
    UPDATE public.six_questions
	    SET
      who='${JSON.stringify(persons).replace('[', '{').replace(']', '}')}',
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
      INSERT INTO public.places ( name, details )
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
      UPDATE public.places
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


  const PLACES_PER_PAGE = 10;
  export async function fetchFilteredPlaces(
    query: string,
    currentPage: number,
  ) {
    noStore();
    const offset = (currentPage - 1) * PLACES_PER_PAGE;
    try {
      const answers = await client.query(
       `SELECT * FROM public.places
        WHERE name ILIKE '%${query}%' OR
            details->>'street' ILIKE '%${query}%' OR
            details->>'city' ILIKE '%${query}%' OR
            details->>'state' ILIKE '%${query}%'
            LIMIT ${PLACES_PER_PAGE} OFFSET ${offset};`
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
        FROM public.places
        WHERE name ILIKE '%${query}%' OR
              details->>'street' ILIKE '%${query}%' OR
              details->>'city' ILIKE '%${query}%' OR
              details->>'state' ILIKE '%${query}%';
    `);
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / PLACES_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of places.');
    }
  }
