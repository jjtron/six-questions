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

      <div className="flex flex-col rounded-md bg-gray-50 p-4 md:p-6">
        
      <input id="id" name="id" type="hidden" value={uuidv4()} />

      <input
                id="placename"
                name="placename"
                type="text"
                step="0.01"
                placeholder='The name of the place'
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="where-error"
              />
      <input
                id="city"
                name="city"
                type="text"
                step="0.01"
                placeholder='Name of city'
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="city-error"
              />
      <input
                id="street"
                name="street"
                type="text"
                step="0.01"
                placeholder='Street address'
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="street-error"
              />
      <input
                id="state"
                name="state"
                type="text"
                step="0.01"
                placeholder='state'
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="State-error"
              />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button type="submit">Create Place</Button>
      </div>
      </div>
    </form>
  );
}