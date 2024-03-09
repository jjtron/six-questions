import { Client } from 'pg';
import { unstable_noStore as noStore } from 'next/cache';
import { Place } from './interfaces'

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'questions',
    password: '',
    port: 5432,
  });
  client.connect();

  export async function getDbData(q: string) {
    try {
      const result: any = await client.query(q);
      return {success: true, details: result};
    } catch(error: any) {
      return {success: false, details: error};
    }
  };

  export async function insertPersonRecord(data: FormData) {
    try {
      const result: any = await client.query(`
        INSERT INTO public.people (name)
        VALUES ('${data.get("name")}');
      `);
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to insert a person record.');
    }
  }

  export async function updatePersonRecord(data: FormData) {
    try {
      const result: any = await client.query(`
        UPDATE public.people
        SET name='${data.get('personname')}'
        WHERE index='${data.get('index')}';
      `);
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to update a person record.');
    }
  }

  const PEOPLE_PER_PAGE = 10;
  export async function fetchFilteredPeople(
    query: string,
    currentPage: number,
  ) {
    noStore();
    const offset = (currentPage - 1) * PEOPLE_PER_PAGE;
    const queryDecoded = (decodeURIComponent(query)).replace("'", "''");
  
    try {
      const answers = await client.query(`SELECT index, name
        FROM public.people
        WHERE name ILIKE '%${queryDecoded}%'
        LIMIT ${PEOPLE_PER_PAGE} OFFSET ${offset}`
      );
      
      return answers.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch answers.');
    }
  }

  export async function fetchRecordsPeople(query: string) {
    noStore();
    const queryDecoded = (decodeURIComponent(query)).replace("'", "''");
    try {
      const count = await client.query(
       `SELECT COUNT(*)
        FROM public.people
        WHERE name ILIKE '%${queryDecoded}%';
    `);
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / PEOPLE_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of people.');
    }
  }

  export async function insertAnswerRecord(data: FormData) {
    try {
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
      INSERT INTO public.six_answers(
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
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to insert an answers record.');
    }
  };

  export async function updateAnswerRecord(data: FormData) {
    try {
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
      UPDATE public.six_answers
        SET
        who='${JSON.stringify(persons).replace('[', '{').replace(']', '}').replace("'", "\'")}',
        what='${data.get("what")}',
        "when"='${JSON.stringify(timestamp)}',
        "where"='${data.get("where")}',
        why='${data.get("why")}',
        how='${data.get("how")}'
        WHERE id = '${data.get("id")}';`
      );
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to update an answers record.');
    }
  };

  export async function insertPlaceRecord(data: FormData) {
    try {
      const result: any = await client.query(`
        INSERT INTO public.places ( name, details, type, sort_order )
        VALUES (
          '${data.get("placename")}',
          '${JSON.stringify({ 
            city: data.get("city"),
            street: data.get("street"),
            state: data.get("state"),
            })}',
          'street_city_state',
          1
        );`
      );
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to insert a place record.');
    }
  }

  export async function updatePlaceRecord(data: FormData) {
    try {
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
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to update a place record.');
    }
  }

  const ITEMS_PER_PAGE = 1;
  export async function fetchFilteredRecords(
    query: string,
    currentPage: number,
  ) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
      const whoWhereSearchTerms = await getWhoWhereSearchTerms(query);
      if (whoWhereSearchTerms.success) {
        const answers = await client.query(
        `SELECT id, who, what, "where", "when", why, how
          FROM public.six_answers
          WHERE what ILIKE '%${query}%' OR
              why ILIKE '%${query}%' OR
              how ILIKE '%${query}%' OR
              "when"->>'date' ILIKE '%${query}%' OR
              "when"->>'time' ILIKE '%${query}%'
              ${whoWhereSearchTerms.stringSegment}
              LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};`
        );
        return answers.rows;
      } else {
        console.error('Database Error:', whoWhereSearchTerms.errormsg);
        throw new Error('Failed to get who/where query string segment.');
      }

    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch answers.');
    }
  }

  export async function fetchRecordsPages(query: string) {
    noStore();

    try {
      const whoWhereSearchTerms = await getWhoWhereSearchTerms(query);
      if (whoWhereSearchTerms.success) {
        const count = await client.query(
        `SELECT COUNT(*)
          FROM public.six_answers
          WHERE what ILIKE '%${query}%' OR
              why ILIKE '%${query}%' OR
              how ILIKE '%${query}%' OR
              "when"->>'date' ILIKE '%${query}%' OR
              "when"->>'time' ILIKE '%${query}%'
              ${whoWhereSearchTerms.stringSegment}
        `);
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
      } else {
        console.error('Database Error:', whoWhereSearchTerms.errormsg);
        throw new Error('Failed to get who/where query string segment.');
      }

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
      const places = await client.query(`
        SELECT * FROM public.places
        WHERE name ILIKE '%${query}%' OR
            details->>'street' ILIKE '%${query}%' OR
            details->>'city' ILIKE '%${query}%' OR
            details->>'state' ILIKE '%${query}%' OR
            details->>'country(s)' ILIKE '%${query}%' OR
            details->>'country' ILIKE '%${query}%' OR
            details->>'description' ILIKE '%${query}%'
            ORDER BY sort_order ASC
            LIMIT ${PLACES_PER_PAGE} OFFSET ${offset};`
        );
      const groups = await client.query(`SELECT Distinct type, sort_order FROM public.places ORDER BY sort_order ASC`);
      let groupedPlaces: Place[][] = [];
      groups.rows.map((group: {type: string;}) => {
        groupedPlaces.push(places.rows.filter((place: Place) => {
          return place.type === group.type;
        }));
      })
      return groupedPlaces;
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

  export async function getWhoWhereSearchTerms(query: string) {
    try {
      // GET MATCHES IN THE PEOPLE TABLE
      let queryString = `%${query}%`;
      if (query.length === 0) {
        queryString = 'NULL';
      }
      const indexesOfPeopleFoundByQuery = await client.query(
        `SELECT index
        FROM public.people
        WHERE name ILIKE '${queryString}';`
      );

      // GET THE ENTIRE whos COLUMN WITH REFERENCE TO ids OF THE RECORD
      const listOfIndexesOfPeopleInRecords = await client.query(
        `SELECT id, who
          FROM public.six_answers`
      );

      // FIND WHERE THE ids FOUND IN THE whos COLUMN MATCH
      // ANY INDEXES OF THE people TABLE, AND
      // COLLECT ANY MATCHES IN AN ARRAY
      let six_answersRecordIdsOfPeopleFound: string[] = [];
      listOfIndexesOfPeopleInRecords.rows.forEach((six_answersRecord: { id: string; who: number[]}) => {
        if (six_answersRecord.who.find((el) => {
          if (indexesOfPeopleFoundByQuery.rows.find((person) => {
            return person.index === el;
          }) !== undefined) {
              return true;
          } else {
              return false;
          }
        })) {
          six_answersRecordIdsOfPeopleFound.push(six_answersRecord.id)
        }
      });

      // BUILD A SEGMENT OF SQL FOR THE NEXT QUERY TO FIND
      // ALL MATCHES IN EVERY REMAINING COLUMN
      let idQuerySegment1: string = '';
      six_answersRecordIdsOfPeopleFound.forEach((uuid: string) => {
        idQuerySegment1 += ` OR id = '${uuid}'`
      });

      // GET THE ENTIRE who COLUMN OF public.six_answers WITH REFERENCE TO ids OF THE RECORD
      const listOfIdsRefPlacesInRecords = await client.query(`
        SELECT id, "where"
        FROM public.six_answers;`
      );

      // GET MATCHES IN THE PLACES TABLE
      let queryString2 = `%${query}%`;
      if (query.length === 0) { queryString2 = 'NULL'; }
      const indexesOfPlacesFoundByQuery = await client.query(
       `SELECT id
        FROM public.places
        WHERE name ILIKE '%${queryString2}%' OR
              details->>'street' ILIKE '%${queryString2}%' OR
              details->>'city' ILIKE '%${queryString2}%' OR
              details->>'state' ILIKE '%${queryString2}%'
      `);

      // FIND WHERE THE ids FOUND IN THE where COLUMN MATCH
      // ANY INDEXES OF THE places TABLE, AND
      // COLLECT ANY MATCHES IN AN ARRAY
      let six_answersRecordIdsOfPlacesFound: string[] = [];
      listOfIdsRefPlacesInRecords.rows.forEach(
        (six_answersRecord: {
          id: string;
          where: number;
        }) => {
          if (indexesOfPlacesFoundByQuery.rows.find((row) => {
            return row.id === six_answersRecord.where;
          }) !== undefined) {
            six_answersRecordIdsOfPlacesFound.push(six_answersRecord.id);
          }
      });
      // ALL MATCHES IN EVERY REMAINING COLUMN
      let idQuerySegment2: string = '';
      six_answersRecordIdsOfPlacesFound.forEach((uuid: string) => {
        idQuerySegment2 += ` OR id = '${uuid}'`
      });

      return {
        success: true,
        stringSegment: idQuerySegment1 + idQuerySegment2
      }
    } catch (error) {
        console.error('Database Error (getWhoWhereSearchTerms):', error);
        return {
          success: false,
          errormsg: "Failed to get who/where query string segment" 
        }
    }
  }
