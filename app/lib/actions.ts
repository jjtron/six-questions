'use server';
import * as https from 'https';
import z, { number } from "zod"; 
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    id?: string[];
    who?: Object;
    what?: string[];
    where?: Object;
    when?: Object;
    why?: string[];
    how?: string[];
  }; 
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  who: z.string(),
  what: z.string(),
  where: z.object({}),
  when: z.object({}),
  why: z.string(),
  how: z.string(),
});

export async function createRecord(prevState: State, formData: FormData) {
  console.log(formData.getAll('who'));
  const validatedFields = FormSchema.safeParse({
    id: formData.get('id'),
    who: formData.get('who'),
    what: formData.get('what'),
    where: formData.get('where'),
    when: formData.get('when'),
    why: formData.get('why'),
    how: formData.get('how'),
  });
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log('Error:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Record.',
    };
  }

  redirect('/records/create');
}

const genericExample = z.object({
  el: z.string()
});
export async function getRecords() {
  return [[0,1,2,3,4,5,6]];
}
export async function getData() {
  return new Promise((resolve: any, reject: any) => {
    let url: Object;
      url = {
        host: 'api.congress.gov',
        path: '/v3/bill?api_key=O5cpoc3OD9qRLRA6YfxSmpuZkCRpiSkIYfMXsrFN',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    
    https.get(url, (resp: any) => {
      let data: any = '';
      resp.setEncoding('utf8');
      resp.on('data', (chunk: any) => {
        data += chunk;
      });
      resp.on('end', () => {
        if (!genericExample.safeParse(JSON.parse(data)).success) {
          resolve([[0, 1, 2],[3, 4, 5]]);
          /*
          reject({
            error: "Datatype error",
            data: JSON.parse(data)
          });
          */
        } else {
          resolve(JSON.parse(data));
        }
      })
    }).on("error", (err: any) => {
      reject("Error: " + err.message);
    });
  });
}
