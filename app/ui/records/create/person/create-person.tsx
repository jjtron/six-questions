'use client';
import { createPerson } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button1';
import { redirect } from 'next/navigation';

export default function Form() {
  
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPerson, initialState);

  if ( state.message === "success" ) {
    redirect('/records/view/people');
  }

  return (
    <form action={dispatch} className="flex flex-col rounded-md bg-slate-200 p-4 md:p-6 md:ml-2">

      <input id="id" name="id" type="hidden" />

      <div className="flex flex-row">
          <input
            id="name"
            name="name"
            type="text"
            step="0.01"
            placeholder='The name of the person'
            className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
            aria-describedby="name-error"
          />
          <div id="placename-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
      </div>
      <textarea
              id="comments" name="comments" rows={3} maxLength={200}
              defaultValue=""
              placeholder='Description (optional; max number of characters: 200)'
              className="block w-full resize-none rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
              aria-describedby="desc-error"
          />
      <div className="flex flex-col items-center justify-between p-4">
        <Button type="submit">Create Person</Button>
      </div>
    </form>
  );
}