'use client';
import { Button } from '@/app/ui/button1';
import { useFormState } from 'react-dom';
import { updateRecord } from '@/app/lib/actions';

export default function Form({ record } : { record: any }) {

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(updateRecord, initialState);

  return (
    <form action={dispatch} className="flex flex-col md:pl-2 bg-inherit">
        <input id="id" name="id" type="hidden" value={record[0].id} />
        <input
                id="placename"
                name="placename"
                type="text"
                step="0.01"
                value={record[0].placename}
                placeholder='The name of the place'
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="where-error"
                />
        <input
                id="city"
                name="city"
                type="text"
                step="0.01"
                value={record[0].city}
                placeholder='Name of city'
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="city-error"
                />
        <input
                id="street"
                name="street"
                type="text"
                step="0.01"
                value={record[0].street}
                placeholder='Street address'
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="street-error"
                />
        <input
                id="state"
                name="state"
                type="text"
                step="0.01"
                value={record[0].state}
                placeholder='state'
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="State-error"
                />
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <Button type="submit">Edit Place</Button>
        </div>
    </form>
  );
}
