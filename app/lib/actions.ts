'use server';
import z, { number } from "zod"; 
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { insertAnswerRecord, insertPlaceRecord,
         updateAnswerRecord, updatePlaceRecord,
         insertPersonRecord, updatePersonRecord } from './database';

//////////////////////PERSON FUNCTIONS/////////////////////
export type PersonState = {
  errors?: {
    name?: string[];
  }; 
  message?: string | null;
};

const PersonCreateFormSchema = z.object({
  name: z.string().min(1, { message: "required" }),
});

export async function createPerson(prevState: PersonState, formData: FormData) {
  const validatedFields = PersonCreateFormSchema.safeParse({
    name: formData.get('name'),
  });
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log('Error:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Person.',
    };
  }

  insertPersonRecord(formData);

  revalidatePath('/records/view/people');
  redirect('/records/view/people');
}
export type PersonUpdateState = {
  errors?: {
    index?: string[],
    personname?: string[];
  }; 
  message?: string | null;
};
const PersonUpdateFormSchema = z.object({
  index: z.coerce.number(),
  personname: z.string().min(1, { message: "required" }),
});

export async function updatePerson(prevState: PersonUpdateState, formData: FormData) {
  const validatedFields = PersonUpdateFormSchema.safeParse({
    index: formData.get('index'),
    personname: formData.get('personname'),
  });
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log('Error:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Person.',
    };
  }

  updatePersonRecord(formData);

  revalidatePath('/records/view/people');
  redirect('/records/view/people');
}

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
  who: z.string().array().refine(
    (a) => {
            if (a.length < 1) { return false; }
            let r = true;
            a.forEach((el: any) => { if (isNaN(el)) { r = false; }});
            return r;
           },
           { message: "Invalid input; required" }
  ),
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
    who: formData.getAll('who'),
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
    who: formData.getAll('who'),
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
    /* as in STREET, CITY, STATE */
    placename?: string[];
    city?: string[];
    street?: string[];
    state?: string[];

    /* as in COUNTRY ONLY */
    country?: string[]; 

    /* as in COUNTRY AND CITY */
    country_2?: string[]; 
    city_2?: string[];

    /* as in ANY */
    title?: string[];
    desc?: string[];
   
  }; 
  message?: string | null;
};

export async function createPlace(prevState: PlaceState, formData: FormData) {

  /* Make sure a valid form type is submitted */
  if  (z.object(
        {type: z.string().refine((t) => { return (
          t === 'street_city_state' ||
          t === 'country' ||
          t === 'country_city' ||
          t === 'any'
        )}),
        sort_order: z.string().refine((so: string) => { return (
          Number(so) >= 0 && Number(so) <= 4
        )})}
      ).safeParse({
        type: formData.get('type'),
        sort_order: formData.get('sort_order')
      }).success) {
  } else {
    throw new Error('Failed to provide a valid type.');
  }

  let validatedFields: any;
  if          ( formData.get('type') === 'street_city_state') {
                  validatedFields = z.object({
                    placename: z.string().min(1, { message: "required" }),
                    street: z.string().min(1, { message: "required" }),
                    city: z.string().min(1, { message: "required" }),
                    state: z.string().min(1, { message: "required" }),
                  }).safeParse({
                    placename: formData.get('placename'),
                    street: formData.get('street'),
                    city: formData.get('city'),
                    state: formData.get('state'),
                  });
                  // If form validation fails, return errors early. Otherwise, continue.
                  if (!validatedFields.success) {
                    console.log('Error, street_city_state:', validatedFields.error.flatten().fieldErrors);
                    return {
                      errors: validatedFields.error.flatten().fieldErrors,
                      message: 'Missing Fields. Failed to Create Record.',
                    };
                  }
  }  else if  ( formData.get('type') === 'country') {
                  validatedFields = z.object({
                    country: z.string().min(1, { message: "required" })
                  }).safeParse({
                    country: formData.get('country')
                  });
                  // If form validation fails, return errors early. Otherwise, continue.
                  if (!validatedFields.success) {
                    console.log('Error, country:', validatedFields.error.flatten().fieldErrors);
                    return {
                      errors: validatedFields.error.flatten().fieldErrors,
                      message: 'Missing Fields. Failed to Create Record.',
                    };
                  }
  } else if   ( formData.get('type') === 'country_city') {
                  validatedFields = z.object({
                    country_2: z.string().min(1, { message: "required" }),
                    city_2: z.string().min(1, { message: "required" })
                  }).safeParse({
                    country_2: formData.get('country_2'),
                    city_2: formData.get('city_2')
                  });
                  // If form validation fails, return errors early. Otherwise, continue.
                  if (!validatedFields.success) {
                    console.log('Error, country_city:', validatedFields.error.flatten().fieldErrors);
                    return {
                      errors: validatedFields.error.flatten().fieldErrors,
                      message: 'Missing Fields. Failed to Create Record.',
                    };
                  }
  } else if   ( formData.get('type') === 'any') { 
                  validatedFields = z.object({
                    title: z.string().min(1, { message: "required" }),
                    desc: z.string().min(1, { message: "required" })
                  }).safeParse({
                    title: formData.get('title'),
                    desc: formData.get('desc')
                  });
                  // If form validation fails, return errors early. Otherwise, continue.
                  if (!validatedFields.success) {
                    console.log('Error, any:', validatedFields.error.flatten().fieldErrors);
                    return {
                      errors: validatedFields.error.flatten().fieldErrors,
                      message: 'Missing Fields. Failed to Create Record.',
                    };
                  }
  } else {
    throw new Error('FormData validation failed.');
  }

  insertPlaceRecord(formData);

  revalidatePath('/records/view/places');
  redirect('/records/view/places');
}

export async function updatePlace(prevState: PlaceState, formData: FormData) {
  const PlaceUpdateFormSchema = z.object({
    placename: z.string().min(1, { message: "required" }),
    city: z.string().min(1, { message: "required" }),
    street: z.string().min(1, { message: "required" }),
    state: z.string().min(1, { message: "required" }),
  });
  const validatedFields = PlaceUpdateFormSchema.safeParse({
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