'use client';
import { createPlace } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button1';
import { useState } from 'react';
import clsx from 'clsx';

export default function Form() {
  
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPlace, initialState);

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  
  return (
    <form action={dispatch} className="flex flex-col rounded-md bg-slate-200 p-4 md:p-6 md:ml-2">



          <div className="flex flex-row">
              <input type="radio" name="my-accordion-1" onClick={() => { setIsOpen2(false); }} />
              <p className="pl-2">Address</p>
          </div>

          <div className={clsx("w-full", {"myvisible": !isOpen2, "myhidden": isOpen2 })}>
                


          




      <input id="id" name="id" type="hidden" />

      <div className="flex flex-row">
          <input
            id="placename"
            name="placename"
            type="text"
            step="0.01"
            placeholder='The name of the place'
            className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
            aria-describedby="placename-error"
          />
          <div id="placename-error" aria-live="polite" aria-atomic="true">
            {state.errors?.placename &&
              state.errors.placename.map((error: string) => (
                <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
      </div>

      <div className="flex flex-row">
          <input
            id="street"
            name="street"
            type="text"
            step="0.01"
            placeholder='Street address'
            className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
            aria-describedby="street-error"
          />
          <div id="street-error" aria-live="polite" aria-atomic="true">
            {state.errors?.street &&
              state.errors.street.map((error: string) => (
                <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
      </div>
      
      <div className="flex flex-row">
          <input
            id="city"
            name="city"
            type="text"
            step="0.01"
            placeholder='Name of city'
            className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
            aria-describedby="city-error"
          />
          <div id="city-error" aria-live="polite" aria-atomic="true">
            {state.errors?.city &&
              state.errors.city.map((error: string) => (
                <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
      </div>

      <div className="flex flex-row">
          <input
            id="state"
            name="state"
            type="text"
            step="0.01"
            placeholder='state'
            className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
            aria-describedby="State-error"
          />
          <div id="state-error" aria-live="polite" aria-atomic="true">
            {state.errors?.state &&
              state.errors.state.map((error: string) => (
                <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
      </div>
       </div>

       <input type="radio" name="my-accordion-1" onClick={() => { setIsOpen2(true); }} />


      <div className="flex flex-col items-center justify-between p-4">
        <Button type="submit">Create Place</Button>
      </div>
    </form>
  );
}

/*
        <div className={clsx("collapse bg-base-200", {"collapse-close": !isOpen1, "collapse-open": isOpen1 })}  
          onClick={() => { setIsOpen1(!isOpen1); }}>
          <input type="radio" name="my-accordion-1" /> 
          <div className="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div className="collapse-content collapse-close"> 
            <p>hello</p>
          </div>
        </div>
*/