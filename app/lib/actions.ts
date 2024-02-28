'use server';
import * as https from 'https';
import z, { number } from "zod"; 
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { insertAnswerRecord, insertPlaceRecord, updateAnswerRecord, updatePlaceRecord } from './database';

export type State = {
  errors?: {
    id?: string[];
    who?: string[];
    what?: string[];
    where?: string[];
    when?: string[];
    why?: string[];
    how?: string[];
  }; 
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID" }),
  who: z.string(),
  what: z.string().min(1, { message: "required" }),
  where: z.string(),
  when: z.string().array().min(2),
  why: z.string().min(1, { message: "required" }),
  how: z.string().min(1, { message: "required" }),
});

export async function updateRecord(prevState: State, formData: FormData) {
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

  updateAnswerRecord(formData);

  revalidatePath('/records/view/answers');
  redirect('/records/view/answers');
}

export async function createRecord(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    id: formData.get('id'),
    who: formData.get('who'),
    what: formData.get('what'),
    where: formData.get('where'),
    when: formData.getAll('when'),
    why: formData.get('why'),
    how: formData.get('how'),
  });
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    let errors = validatedFields.error.flatten().fieldErrors;
    if (typeof errors.where !== undefined && Array.isArray(errors.where)) {
      if (errors.where[0] === 'Expected string, received null') {
        errors.where[0] = 'required';
      }
    }
    if (typeof errors.who !== undefined && Array.isArray(errors.who)) {
      if (errors.who[0] === 'Expected string, received null') {
        errors.who[0] = 'required';
      }
    }
    return {
      errors: errors,
      message: 'Missing Fields. Failed to Create Record.',
    };
  }

  insertAnswerRecord(formData);

  revalidatePath('/records/view/answers');
  redirect('/records/view/answers');
}

export type PlaceState = {
  errors?: {
    id?: string[];
    placename?: string[];
    city?: string[];
    street?: string[];
    state?: string[];
  }; 
  message?: string | null;
};
const PlaceFormSchema = z.object({
  id: z.string(),
  placename: z.string(),
  city: z.string(),
  street: z.string(),
  state: z.string(),
});

export async function createPlace(prevState: PlaceState, formData: FormData) {
  const validatedFields = PlaceFormSchema.safeParse({
    id: formData.get('id'),
    placename: formData.get('placename'),
    city: formData.get('city'),
    street: formData.get('street'),
    state: formData.get('state'),
  });
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log('Error:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Record.',
    };
  }

  insertPlaceRecord(formData);

  revalidatePath('/records/view/answers');
  redirect('/records/view/answers');
}

export async function updatePlace(prevState: PlaceState, formData: FormData) {
  const validatedFields = PlaceFormSchema.safeParse({
    id: formData.get('id'),
    placename: formData.get('placename'),
    city: formData.get('city'),
    street: formData.get('street'),
    state: formData.get('state'),
  });
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log('Error:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Record.',
    };
  }

  updatePlaceRecord(formData);

  revalidatePath('/records/view/places');
  redirect('/records/view/places');
}
/* THE FOLLOWING IS LEGACY CODE SAVED FOR REFERENCE
const genericExample = z.object({
  el: z.string()
});
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
          
          //reject({
          //  error: "Datatype error",
          //  data: JSON.parse(data)
          //});
          
        } else {
          resolve(JSON.parse(data));
        }
      })
    }).on("error", (err: any) => {
      reject("Error: " + err.message);
    });
  });
}
*/
