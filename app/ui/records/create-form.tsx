'use client';
import { createRecord } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button1';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createRecord, initialState);
  
  return (
    <form action={dispatch}>
      <p>Createform</p>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <input
                id="id"
                name="id"
                type="string"
                step="0.01"
                placeholder="9491d710-3185-4e06-bea0-6a2f275345e0"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="id-error"
              />
      <input
                id="who"
                name="who"
                type="string"
                step="0.01"
                placeholder="{}"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="who-error"
              />
      <input
                id="what"
                name="what"
                type="string"
                step="0.01"
                placeholder="what"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="what-error"
              />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button type="submit">Create Record</Button>
      </div>
      </div>
    </form>
  );
}
