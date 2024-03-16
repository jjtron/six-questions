'use client';
import { createPlace } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button1';
import { useState } from 'react';
import clsx from 'clsx';

export default function Form() {
  
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createEventTime, initialState);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  function setRadioButton (option: number) {
      (option === 1) ? setIsOpen1(true) : setIsOpen1(false);
      (option === 2) ? setIsOpen2(true) : setIsOpen2(false);
  }

  return (
    <form action={dispatch} className="flex flex-col rounded-md bg-slate-200 p-4 md:p-6 md:ml-2">
        <div className="h-[520px]">
          {/* CIRCA ///////////////////////////////////////////////////////////////// */}
          <div className="flex flex-row">
              <input  type="radio" name="my-accordion-1"
                      onClick={() => {setRadioButton(1)}}
                      checked={isOpen1}
                      onChange={() => {}}
              />
              <p className="pl-2">Circa</p>
          </div>
          <div className={clsx("w-full max-h-[124px] rounded-md",
                              {"place-type-enabled": isOpen1,
                              "place-type-disabled": !isOpen1 })
                        }>
                <div className="flex flex-row">
                    <input disabled={!isOpen1} id="type" name="type" value="circa" type="hidden" />
                    <input
                      disabled={!isOpen1} id="circa" name="circa" type="text" step="0.01"
                      placeholder='Format: yyyy AD/BC   OR   yyyy AD/BC - yyyy AD/BC'
                      className="block w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                      aria-describedby="circa-error"
                    />
                    <div id="circa-error" aria-live="polite" aria-atomic="true">
                      {state.errors?.circa &&
                        state.errors.circa.map((error: string) => (
                          <p className="px-2 leading-9 text-sm text-red-500" key={error}>
                            {error}
                          </p>
                      ))}
                    </div>
                </div>

                {/* COMMENTS */}
                <div className="flex flex-row">
                    <textarea
                      disabled={!isOpen1} id="comments" name="comments" rows={3} maxLength={200}
                      placeholder='Comments (max number of characters: 200)'
                      className="block w-full resize-none rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                      aria-describedby="comments-error"
                    />
                    <div id="comments-error" aria-live="polite" aria-atomic="true">
                      {state.errors?.comments &&
                        state.errors.comments.map((error: string) => (
                          <p className="px-2 leading-9 text-sm text-red-500" key={error}>
                            {error}
                          </p>
                      ))}
                    </div>
                </div>
                <input type="hidden" id="sort_order" name="sort_order" value="1" disabled={!isOpen1} />
          </div>
          {/* GENERAL ///////////////////////////////////////////////////////////////// */}
          <div className="flex flex-row">
              <input  type="radio" name="my-accordion-1"
                      onClick={() => {setRadioButton(2)}}
                      checked={isOpen2}
                      onChange={() => {}}
              />
              <p className="pl-2">General</p>
          </div>
          <div className={clsx("w-full max-h-[124px] rounded-md",
                              {"place-type-enabled": isOpen2,
                              "place-type-disabled": !isOpen2 })
                        }>
                <div className="flex flex-row">
                    <input disabled={!isOpen2} id="type" name="type" value="general" type="hidden" />
                    <input
                      disabled={!isOpen2} id="general" name="general" type="text" step="0.01"
                      placeholder='Title (up to 100 characters)'
                      className="block w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                      aria-describedby="general-error"
                    />
                    <div id="general-error" aria-live="polite" aria-atomic="true">
                      {state.errors?.general &&
                        state.errors.general.map((error: string) => (
                          <p className="px-2 leading-9 text-sm text-red-500" key={error}>
                            {error}
                          </p>
                      ))}
                    </div>
                </div>

                {/* COMMENTS */}
                <div className="flex flex-row">
                    <textarea
                      disabled={!isOpen2} id="comments" name="comments" rows={3} maxLength={200}
                      placeholder='Comments (max number of characters: 200)'
                      className="block w-full resize-none rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                      aria-describedby="comments-error"
                    />
                    <div id="comments-error" aria-live="polite" aria-atomic="true">
                      {state.errors?.comments &&
                        state.errors.comments.map((error: string) => (
                          <p className="px-2 leading-9 text-sm text-red-500" key={error}>
                            {error}
                          </p>
                      ))}
                    </div>
                </div>
                <input type="hidden" id="sort_order" name="sort_order" value="1" disabled={!isOpen2} />
          </div>


        </div>
        <div className="flex flex-col items-center justify-between p-4">
          <Button type="submit">Create Event Time</Button>
        </div>
    </form>
  );
}
