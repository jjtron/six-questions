'use client';
import { Button } from '@/app/ui/button1';
import { useFormState } from 'react-dom';
import { updateEventTime } from '@/app/lib/actions';
import { EventTime } from '@/app/lib/interfaces';

export default function Form({ eventTime } : { eventTime: EventTime }) {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateEventTime, initialState);

  return (
    <form action={dispatch} className="flex flex-col rounded-md bg-gray-50 p-4 md:p-6 md:ml-2">
        <input id="id" name="id" type="hidden" defaultValue={eventTime.id} />
        <input id="type" name="type" type="hidden" defaultValue={eventTime.type} />

        <div className="flex flex-row">
            <input
              id="name"
              name="name"
              type="text"
              step="0.01"
              defaultValue={eventTime.name}
              placeholder='The name of the event time'
              className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
              aria-describedby="name-error"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="pl-2 leading-4 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
        </div>
        <div className="flex flex-row">
            <textarea
              id="comments"
              name="comments"
              defaultValue={eventTime.comments}
              placeholder='Name of city'
              className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
              aria-describedby="comments-error"
            />
            <div id="comments-error" aria-live="polite" aria-atomic="true">
              {state.errors?.comments &&
                state.errors.comments.map((error: string) => (
                  <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
        </div>
        <div className="flex flex-col items-center justify-between p-4">
            <Button type="submit">Save Changes</Button>
        </div>
    </form>
  );
}
