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
      const statement: string = 'INSERT INTO public.people (name) VALUES ($1)';
      const result: any = await client.query(
        statement,
        [(data.get("name") as string).replaceAll("'", "\'")]
      );
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to insert a person record.');
    }
  }

  export async function updatePersonRecord(data: FormData) {
    try {
      const statement: string = `UPDATE public.people ` + 
                                `SET name=($1) ` +
                                `WHERE index=($2)`
      const result: any = await client.query(
        statement,
        [
          (data.get("personname") as string).replaceAll("'", "\'"),
           data.get("index")
        ]
      );
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
    const queryDecoded = (decodeURIComponent(query)).replace("'", "\'");
    const statement = `SELECT index, name
                       FROM public.people
                       WHERE name ILIKE ($1)
                       LIMIT ${PEOPLE_PER_PAGE} OFFSET ${offset}`;
    try {
      const answers = await client.query(
        statement,
        [`%${queryDecoded}%`]
      );
      
      return answers.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch answers.');
    }
  }

  export async function fetchRecordsPeople(query: string) {
    noStore();
    const queryDecoded = (decodeURIComponent(query)).replace("'", "\'");
    const statement = 
      `SELECT COUNT(*)
       FROM public.people
       WHERE name ILIKE ($1);`
    try {
      const count = await client.query(
       statement,
       [`%${queryDecoded}%`]
    );
  
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

      const statement = 
         `INSERT INTO public.six_answers(
          id, who, what, "where", "when", why, how)
          VALUES (($1),($2),($3),($4),($5),($6),($7));`
      const variables = [
        data.get("id"),
        JSON.stringify(persons).replace('[', '{').replace(']', '}'),
        (data.get("what") as string).replaceAll("'", "\'"),
        data.get("where"),
        JSON.stringify(timestamp),
        (data.get("why") as string).replaceAll("'", "\'"),
        (data.get("how") as string).replaceAll("'", "\'")
      ];
      const result: any = await client.query(statement, variables);
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

      const statement = 
         `UPDATE public.six_answers
          SET who=($1), what=($2), "when"=($3), "where"=($4), why=($5), how=($6) WHERE id = ($7);`
      const variables = [
        JSON.stringify(persons).replace('[', '{').replace(']', '}').replace("'", "\'"),
        (data.get("what") as string).replaceAll("'", "\'"),
        JSON.stringify(timestamp),
        data.get("where"),
        (data.get("why") as string).replaceAll("'", "\'"),
        (data.get("how") as string).replaceAll("'", "\'"),
        data.get("id")
      ];
      const result: any = await client.query(statement, variables);
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to update an answers record.');
    }
  };

  export async function insertPlaceRecord(data: FormData) {
    try {
      const statement =
       `INSERT INTO public.places ( name, details, type, sort_order )
        VALUES (($1), ($2), ($3), ($4));`;
      
      const sort_order = (data.get("sort_order") as string);
      let variables: any[] = [];
      if (sort_order === '1') {
        variables.push((data.get("placename") as string).replaceAll("'", "\'"));
        variables.push(JSON.stringify({ 
          city: (data.get("city") as string).replaceAll("'", "\'"),
          street: (data.get("street") as string).replaceAll("'", "\'"),
          state: (data.get("state") as string).replaceAll("'", "\'")
        }));
        variables.push("street_city_state");
        variables.push(1);
      } else if (sort_order === '2') {
        variables.push((data.get("country") as string).replaceAll("'", "\'"));
        variables.push('{}');
        variables.push("country");
        variables.push(2);
      }
      const result: any = await client.query(statement, variables);
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to insert a place record.');
    }
  }

  export async function updatePlaceRecord(data: FormData) {
    try {
      const statement =
       `UPDATE public.places
        SET name=($1), details=($2)
        WHERE id = ($3)`;
      const variables = [
        (data.get('placename') as string).replaceAll("'", "\'"),
        JSON.stringify({ 
          city: (data.get("city") as string).replaceAll("'", "\'"),
          street: (data.get("street") as string).replaceAll("'", "\'"),
          state: (data.get("state") as string).replaceAll("'", "\'")
        }),
        data.get('id')
      ];
      const result: any = await client.query(statement, variables);
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
      const queryDecoded = (decodeURIComponent(query)).replace("'", "\'");
      const whoWhereSearchTerms = await getWhoWhereSearchTerms(query);
      if (whoWhereSearchTerms.success) {
        
        const statement =
         `SELECT id, who, what, "where", "when", why, how
          FROM public.six_answers
          WHERE what ILIKE ($1) OR
              why ILIKE ($1) OR
              how ILIKE ($1) OR
              "when"->>'date' ILIKE ($1) OR
              "when"->>'time' ILIKE ($1)
              ${whoWhereSearchTerms.stringSegment}
              LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};`;
        const variables = [ `%${queryDecoded}%` ];
        const answers = await client.query(statement, variables);
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
      const queryDecoded = (decodeURIComponent(query)).replace("'", "\'");
      const whoWhereSearchTerms = await getWhoWhereSearchTerms(query);
      if (whoWhereSearchTerms.success) {
        const statement = 
         `SELECT COUNT(*)
          FROM public.six_answers
          WHERE 
            what ILIKE ($1) OR
            why ILIKE ($1) OR
            how ILIKE ($1) OR
            "when"->>'date' ILIKE ($1) OR
            "when"->>'time' ILIKE ($1)
            ${whoWhereSearchTerms.stringSegment}`;
        const variables = [ `%${queryDecoded}%` ];
        const count = await client.query(statement, variables);
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
    recordsPerPage: number
  ) {
    noStore();
    const queryDecoded = (decodeURIComponent(query)).replace("'", "\'");
    const offset = (currentPage - 1) * recordsPerPage;
    try {
      const statement = 
         `SELECT * FROM public.places
          WHERE
              name ILIKE ($1) OR
              details->>'street' ILIKE ($1) OR
              details->>'city' ILIKE ($1) OR
              details->>'state' ILIKE ($1) OR
              details->>'country(s)' ILIKE ($1) OR
              details->>'country' ILIKE ($1) OR
              details->>'description' ILIKE ($1)
              ORDER BY sort_order ASC
              LIMIT ${recordsPerPage} OFFSET ${offset};`;
      const variables = [ `%${queryDecoded}%` ];
      const places = await client.query(statement, variables);
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

  export async function fetchRecordsPlaces(query: string, recordsPerPage: number) {
    noStore();
    try {
      const queryDecoded = (decodeURIComponent(query)).replace("'", "\'");
      const statement = `SELECT COUNT(*)
      FROM public.places
      WHERE name ILIKE ($1) OR
            details->>'street' ILIKE ($1) OR
            details->>'city' ILIKE ($1) OR
            details->>'state' ILIKE ($1);`;
      const variables = [ `%${queryDecoded}%` ];
      const count = await client.query(statement, variables);
      const totalPages = Math.ceil(Number(count.rows[0].count) / recordsPerPage);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of places.');
    }
  }

  export async function getWhoWhereSearchTerms(query: string) {
    try {
      const queryDecoded = (decodeURIComponent(query)).replace("'", "''");
      // GET MATCHES IN THE PEOPLE TABLE
      let queryString = `%${queryDecoded}%`;
      if (queryDecoded.length === 0) { queryString = 'NULL'; }
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
      const indexesOfPlacesFoundByQuery = await client.query(
       `SELECT id
        FROM public.places
        WHERE name ILIKE '%${queryString}%' OR
              details->>'street' ILIKE '%${queryString}%' OR
              details->>'city' ILIKE '%${queryString}%' OR
              details->>'state' ILIKE '%${queryString}%'
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
