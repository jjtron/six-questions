'use client';
import { createPlace } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button1';
import { v4 as uuidv4 } from 'uuid';

export default function Form() {
  
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPlace, initialState);

  return (
    <form action={dispatch}>
      <p>Create A Place</p>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <input
                id="id"
                name="id"
                readOnly
                type="text"
                step="0.01"
                value={uuidv4()}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                style={{color: 'white', backgroundColor: 'black'}}
              />
      <input
                id="placename"
                name="placename"
                type="text"
                step="0.01"
                placeholder='name the place'
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="where-error"
                style={{color: 'white', backgroundColor: 'black'}}
              />
      <input
                id="city"
                name="city"
                type="text"
                step="0.01"
                placeholder='name of city'
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="city-error"
                style={{color: 'white', backgroundColor: 'black'}}
              />
      <input
                id="street"
                name="street"
                type="text"
                step="0.01"
                placeholder='street address'
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="street-error"
                style={{color: 'white', backgroundColor: 'black'}}
              />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button type="submit">Create Place</Button>
      </div>
      </div>
    </form>
  );
}