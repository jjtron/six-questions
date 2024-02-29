'use server';
import * as https from 'https';
import z, { number } from "zod"; 
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { insertAnswerRecord, insertPlaceRecord, updateAnswerRecord, updatePlaceRecord } from './database';
import { Console } from 'console';

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
  id: z.string().uuid({ message: "invalid UUID" }),
  who: z.string().nullable()
    .refine((val) => { return (val !== null) },{ message: "required" }),
  what: z.string().min(1, { message: "required" }),
  where: z.string().nullable()
    .refine((val) => { return (val !== null) },{ message: "required" }),
  when: z.string().array().length(2).refine(
      (a) => {
              const dateRegexp = /^\d{2}\/\d{2}\/\d{4}/;
              const timeRegexp = /^\d{2}:\d{2}\s(AM|PM)/;
              return a[0].length > 0 && 
                      a[1].length > 0 &&
                      dateRegexp.test(a[0]) &&
                      timeRegexp.test(a[1]);
             }, 
             { message: "Invalid date and/or time; both required" }
    ),
  why: z.string().min(1, { message: "required" }),
  how: z.string().min(1, { message: "required" }),
});

export async function updateRecord(prevState: State, formData: FormData) {
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
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      errors: errors,
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
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      errors: errors,
      message: 'Missing Fields. Failed to Create Record.',
    };
  }

  insertAnswerRecord(formData);

  revalidatePath('/records/view/answers');
  redirect('/records/view/answers');
}

//////////////////////PLACE FUNCTIONS/////////////////////
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
  id: z.coerce.number(),
  placename: z.string().min(1, { message: "required" }),
  city: z.string().min(1, { message: "required" }),
  street: z.string().min(1, { message: "required" }),
  state: z.string().min(1, { message: "required" }),
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