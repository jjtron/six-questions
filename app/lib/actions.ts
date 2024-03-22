'use server';
import z, { nullable, number } from "zod"; 
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { insertAnswerRecord, insertPlaceRecord,
         updateAnswerRecord, updatePlaceRecord,
         insertPersonRecord, updatePersonRecord,
         insertTimeRecord, updateEventTimeRecord } from './database';

//////////////////////EVENT-TIME FUNCTIONS/////////////////////
export type CreateEventTimeState = {
  errors?: {
    general?: string[];
    circa?: string[]
  }; 
  message?: string | null;
};

export async function createEventTime(prevState: CreateEventTimeState, formData: FormData) {
  /* Make sure a valid form type is submitted */
  if  (z.object(
        {type: z.string().refine((t) => { return (
          t === 'general' ||
          t === 'circa_yr' ||
          t === 'circa_range' ||
          t === 'circa'
        )})}
      ).safeParse({
        type: formData.get('type')
      }).success) {
  } else {
    return {
      errors: { circa: [ 'No valid data' ] },
      message: 'No valid data. Failed to Create Event-Time.',
    };
  }

  let validatedFields: any;
  if (formData.get('type') === 'circa') {
    return {
      errors: { circa: [ 'a year or year-range is required' ] },
      message: 'Missing data. Failed to Create Event-Time.',
    };
  } else if ( formData.get('type') === 'circa_yr') {
        validatedFields = z.object({
          circa_yr_only: z.string().min(4, { message: "year error" }).nullable()
            .refine(
              (val) => {
                return (val !== null)
              },
              { message: "year or year-range required" }
            ).refine(
              (val) => {
                if ( val !== null) {
                  return (new RegExp(/^\d{1,4}\s((AD|BC))$/).test(val))
                } else {
                  return true;
                }
              },
              { message: "year format error" }
            ),
          comments: z.string().min(1, { message: "comments required" })
        }).safeParse({
          circa_yr_only: formData.get('circa_yr_only'),
          comments: formData.get('comments')
        });
  } else if ( formData.get('type') === 'circa_range' ) {
    validatedFields = z.object({
      circa_yr_range_start: z.string().min(4, { message: "start year error" }),
      circa_yr_range_end: z.string().min(4, { message: "end year error" })
      .refine(
        (val) => {
          const a = formData.get('circa_yr_range_start') as string;
          const b = formData.get('circa_yr_range_end') as string;
          if (a === '' || b === '') { return true; }
          const start = (a.substring(a.length - 2) === 'BC') ? -1 * Number(a.substring(0, a.length - 3)) : Number(a.substring(0, a.length - 3));
          const end = (b.substring(b.length - 2) === 'BC') ? -1 * Number(b.substring(0, b.length - 3)) : Number(b.substring(0, b.length - 3));
          return (start < end);
        },
        { message: "begin > end" }
      ),
      comments: z.string().min(1, { message: "comments required" })
    }).safeParse({
      circa_yr_range_start: formData.get('circa_yr_range_start'),
      circa_yr_range_end: formData.get('circa_yr_range_end'),
      comments: formData.get('comments')
    });
  } else if ( formData.get('type') === 'general' ) {
    validatedFields = z.object({
      general: z.string().min(1, { message: "title required" }),
      comments_2: z.string().min(1, { message: "comments required" })
    }).safeParse({
      general: formData.get('general'),
      comments_2: formData.get('comments_2')
    });
  }
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    const errs = validatedFields.error.flatten().fieldErrors;
    let s: string = '';
    const keys: string[] = Object.keys(errs);
    keys.forEach((key: any, i: number) => {
      errs[key].forEach((val: string, j: number) => {
        s += val += '. ';
      })
    });
    if ((formData.get('type') as string)?.substring(0, 5) === 'circa') {
        return {
          errors: { circa: [ s ] },
          message: 'Missing Fields. Failed to Create Event-Time.',
        };
    } else {
        return {
          errors: { general: [ s ] },
          message: 'Missing Fields. Failed to Create Event-Time.',
        };
    }
  }

  //insertTimeRecord(formData);

  revalidatePath('/records/view/event-times');
  redirect('/records/view/event-times');
}

export type EventTimeUpdateState = {
  errors?: {
    name?: string[];
    comments?: string[];
  }; 
  message?: string | null;
};

export async function updateEventTime(prevState: EventTimeUpdateState, formData: FormData) {
  /* Make sure a valid form type is submitted */
  if  (z.object(
      {type: z.string().refine((t) => { return (
        t === 'general' ||
        t === 'circa'
      )})}
      ).safeParse({
        type: formData.get('type')
      }).success) {
  } else {
    throw new Error('Failed to provide a valid type.');
  }
  const validatedFields = z.object({
    name: z.string().min(1, { message: "required" }),
    comments: z.string().min(1, { message: "required" })
  }).safeParse({
    name: formData.get('name'),
    comments: formData.get('comments')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log('Error:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Person.',
    };
  }

  updateEventTimeRecord(formData);

  revalidatePath('/records/view/event-times');
  redirect('/records/view/event-times');
}

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