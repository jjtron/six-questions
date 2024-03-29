'use server';
import z, { nullable, number } from "zod"; 
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { insertAnswerRecord, insertPlaceRecord,
         updatePlaceRecord, insertPersonRecord,
         updatePersonRecord, insertTimeRecord,
         updateEventTimeRecord
       } from './database';

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

  insertTimeRecord(formData);

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
        t === 'general' || t === 'circa_yr' || t === 'circa_range'
      )})}
      ).safeParse({
        type: formData.get('type')
      }).success) {
  } else {
    throw new Error('Failed to provide a valid type.');
  }
  const validatedFields = z.object({
    name: z.string().min(4, { message: "required" })
      .refine((val) => {
                          if (formData.get('type') === 'circa_yr') {
                            return (new RegExp(/^\d{1,4}\s((AD|BC))$/).test(val));
                          } else if (formData.get('type') === 'circa_range') {
                              return (new RegExp(/^\d{1,4}\s((AD|BC))\s-\s\d{1,4}\s((AD|BC))$/).test(val)
                              &&  (
                                    (() => {
                                      // ensure logical chronological sequence of year range
                                      const a = val.substring(0, val.indexOf('-') - 1);
                                      const b = val.substring(val.indexOf('-') + 2)
                                      const start = (a.substring(a.length - 2) === 'BC') ? -1 * Number(a.substring(0, a.length - 3)) : Number(a.substring(0, a.length - 3));
                                      const end = (b.substring(b.length - 2) === 'BC') ? -1 * Number(b.substring(0, b.length - 3)) : Number(b.substring(0, b.length - 3));
                                      return (start < end);
                                    }))()
                                  )
                          } else {
                            return true;
                          }
                        },
                        { message: "format-error or end-date preceeds start-date" }
      ),

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
//////////////////////////// ANSWER CREATE AND UPDATE //////////////////////////
export type InsertAndCreateState = {
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

const DateFieldSchema = z.object({
  // the six date/time data types: either 'on' or null
  date_type_1: z.string().nullable().refine((val) => { return (val === 'on' || val === null) }, { message: 'date_type_1 invalid'}),
  date_type_2: z.string().nullable().refine((val) => { return (val === 'on' || val === null) }, { message: 'date_type_2 invalid'}),
  date_type_3: z.string().nullable().refine((val) => { return (val === 'on' || val === null) }, { message: 'date_type_3 invalid'}),
  date_type_4: z.string().nullable().refine((val) => { return (val === 'on' || val === null) }, { message: 'date_type_4 invalid'}),
  date_type_5: z.string().nullable().refine((val) => { return (val === 'on' || val === null) }, { message: 'date_type_5 invalid'}),
  date_type_6: z.string().nullable().refine((val) => { return (val === 'on' || val === null) }, { message: 'date_type_6 invalid'})
});

const DateType1Schema = z.object({
    // date_type_1
    yr_mon_day: z.string().refine((d) => {
        const dateRegexp = /^\d{2}\/\d{2}\/\d{4}$/;
        return (dateRegexp.test(d));
      },
      { message: 'invalid date dd/mm/yyyy' }
    ),
    yr_mon_day_time: z.string().refine((t) => {
        const timeRegexp = /^\d{2}:\d{2}\s(AM|PM)$/;
        return (timeRegexp.test(t));
      },
      { message: 'invalid time hh:mm aa' }
    ),
});

const DateType2Schema = z.object({
    // date_type_2
    yr_mon: z.string().refine((d) => {
        const timeRegexp = /^\w{3,9}\s\d{4}$/;
        return (timeRegexp.test(d));
      },
      { message: 'invalid month/year' }
    ),
});

const DateType3Schema = z.object({
    // date_type_3
    date_only_pre1900: z.string().refine((d) => {
        const dateRegexp = /^\d{2}\/\d{2}\/\d{4}$/;
        return (dateRegexp.test(d));
      },
      { message: 'invalid date dd/mm/yyyy' }
    ),
});

const DateType4Schema = z.object({
    // date_type_4
    year_mon_pre1900: z.string().refine((d) => {
          const dateRegexp = /^\d{4}-\d{2}$/;
          return (dateRegexp.test(d));
        },
        { message: 'invalid date yyyy-mm' }
    ),
});

const DateType5Schema = z.object({
  // date_type_5
  yr_only_pre1900: z.string().refine((d) => {
      const dateRegexp = /^\d{4}$/;
      return (dateRegexp.test(d));
    },
    { message: 'invalid date yyyy' }
  ),
});

const DateType6Schema = z.object({
  // date_type_6
  custom_when: z.coerce.number().nullable().refine((val) => {
      return (val !== null) },
      { message: "custom event-time missing" }),
});

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
  why: z.string().min(1, { message: "required" }),
  how: z.string().min(1, { message: "required" }),
});

export async function create0rUpdateAnswer(prevState: InsertAndCreateState, formData: FormData) {
  //console.log(formData);

  let date_error: { [key: string]: string[] | null; } = {  };
  let submittedDateType: string = '';

  const validatedDateFields = DateFieldSchema.safeParse({
    date_type_1: formData.get('date_type_1'),
    date_type_2: formData.get('date_type_2'),
    date_type_3: formData.get('date_type_3'),
    date_type_4: formData.get('date_type_4'),
    date_type_5: formData.get('date_type_5'),
    date_type_6: formData.get('date_type_6'),
  });
  if (!validatedDateFields.success) {
    // something other than 'on' or null is being attempted
    // DO SOMETHING
    date_error = validatedDateFields.error.flatten().fieldErrors;
  }
  
  if (
    // check to make sure only on date_type_X is provided
    !(() => {
      let n: number = 0;
      if (formData.get('date_type_1') !== null) { n++; submittedDateType = 'date_type_1' }
      if (formData.get('date_type_2') !== null) { n++; submittedDateType = 'date_type_2' }
      if (formData.get('date_type_3') !== null) { n++; submittedDateType = 'date_type_3' }
      if (formData.get('date_type_4') !== null) { n++; submittedDateType = 'date_type_4' }
      if (formData.get('date_type_5') !== null) { n++; submittedDateType = 'date_type_5' }
      if (formData.get('date_type_6') !== null) { n++; submittedDateType = 'date_type_6' }
      return (n === 1)
    })()
  ) {
    // either none-at-all or more-than-one has been submitted
    // console.log('no data_type_X field submitted');
    date_error = { when: [ 'One and one only date type is allowed' ] }
  }
  if (formData.get('date_type_1') === 'on') {
    const validatedDateType1Fields = DateType1Schema.safeParse({
      yr_mon_day: formData.get('yr_mon_day'),
      yr_mon_day_time: formData.get('yr_mon_day_time'),
    });
    if (!validatedDateType1Fields.success) {
      // something wrong with date_type_1 submission
      // console.log(validatedDateType1Fields.error.flatten().fieldErrors);
      date_error = validatedDateType1Fields.error.flatten().fieldErrors;
    }
  }
  if (formData.get('date_type_2') === 'on') {
    const validatedDateType2Fields = DateType2Schema.safeParse({
      yr_mon: formData.get('yr_mon'),
    });
    if (!validatedDateType2Fields.success) {
      // something wrong with date_type_2 submission
      // console.log(validatedDateType2Fields.error.flatten().fieldErrors);
      date_error = validatedDateType2Fields.error.flatten().fieldErrors;
    }
  }
  if (formData.get('date_type_3') === 'on') {
    const validatedDateType3Fields = DateType3Schema.safeParse({
      date_only_pre1900: formData.get('date_only_pre1900'),
    });
    if (!validatedDateType3Fields.success) {
      // something wrong with date_type_3 submission
      // console.log(validatedDateType3Fields.error.flatten().fieldErrors);
      date_error = validatedDateType3Fields.error.flatten().fieldErrors;
    }
  }
  if (formData.get('date_type_4') === 'on') {
    const validatedDateType4Fields = DateType4Schema.safeParse({
      year_mon_pre1900: formData.get('year_mon_pre1900'),
    });
    if (!validatedDateType4Fields.success) {
      // something wrong with date_type_4 submission
      // console.log(validatedDateType4Fields.error.flatten().fieldErrors);
      date_error = validatedDateType4Fields.error.flatten().fieldErrors;
    }
  }
  if (formData.get('date_type_5') === 'on') {
    const validatedDateType5Fields = DateType5Schema.safeParse({
      yr_only_pre1900: formData.get('yr_only_pre1900'),
    });
    if (!validatedDateType5Fields.success) {
      // something wrong with date_type_5 submission
      // console.log(validatedDateType5Fields.error.flatten().fieldErrors);
      date_error = validatedDateType5Fields.error.flatten().fieldErrors;
    }
  }
  if (formData.get('date_type_6') === 'on') {
    const validatedDateType6Fields = DateType6Schema.safeParse({
      custom_when: formData.get('custom_when'),
    });
    if (!validatedDateType6Fields.success) {
      // something wrong with date_type_6 submission
      // console.log(validatedDateType6Fields.error.flatten().fieldErrors);
      date_error = validatedDateType6Fields.error.flatten().fieldErrors;
    }
  }

  const validatedFields = FormSchema.safeParse({
    id: formData.get('id'),
    who: formData.getAll('who'),
    what: formData.get('what'),
    where: formData.get('where'),
    why: formData.get('why'),
    how: formData.get('how'),
  });
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    const errors: any = validatedFields.error.flatten().fieldErrors;
    if (Object.keys(date_error).length > 0) {
      let key: string = Object.keys(date_error)[0];
      errors['when'] = date_error[key];
    }
    console.log('ERRORS 1', errors);
    return {
      errors: errors,
      message: 'Missing Fields. Failed to Create Record.',
    };
  } else if (Object.keys(date_error).length > 0) {
    let key: string = Object.keys(date_error)[0];
    console.log('ERRORS 2', { when: [ date_error[key] ] });
    return {
      errors: { when: [ date_error[key] ] },
      message: 'Missing Fields. Failed to Create Record.',
    };
  }

  insertAnswerRecord(formData, submittedDateType);
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