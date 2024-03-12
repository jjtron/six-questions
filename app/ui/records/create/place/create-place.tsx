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
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  function setRadioButton (option: number) {
      (option === 1) ? setIsOpen1(true) : setIsOpen1(false);
      (option === 2) ? setIsOpen2(true) : setIsOpen2(false);
      (option === 3) ? setIsOpen3(true) : setIsOpen3(false);
      (option === 4) ? setIsOpen4(true) : setIsOpen4(false);
  }

  return (
    <form action={dispatch} className="flex flex-col rounded-md bg-slate-200 p-4 md:p-6 md:ml-2">
        <div className="h-[520px]">
          {/* NAME (DESCRIPTION), STREET, CITY, STATE ///////////////////////////////////////////////////////////////// */}
          <div className="flex flex-row">
              <input  type="radio" name="my-accordion-1"
                      onClick={() => {setRadioButton(1)}} 
                      checked={isOpen1}
                      onChange={() => {}}
              />
              <p className="pl-2">Address, City, State</p>
          </div>
          <div className={clsx("w-full max-h-[168px] rounded-md",
                { "place-type-visible": isOpen1,
                  "place-type-hidden": !isOpen1 }
               )}>
              {/* NAME OF THE PLACE (DESCRIPTION) */}
              <input disabled={!isOpen1} id="type" name="type" value="street_city_state" type="hidden" />
              <div className="flex flex-row">
                  <input
                    disabled={!isOpen1} id="placename" name="placename" type="text" step="0.01"
                    placeholder='Place name (description)'
                    className="block w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
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
              {/* STREET */}
              <div className="flex flex-row">
                  <input
                    disabled={!isOpen1} id="street" name="street" type="text" step="0.01"
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
              {/* CITY */}
              <div className="flex flex-row">
                  <input
                    disabled={!isOpen1} id="city" name="city" type="text" step="0.01"
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
              {/* STATE */}
              <div className="flex flex-row">
                  <input
                    disabled={!isOpen1} id="state" name="state" type="text" step="0.01"
                    placeholder='state'
                    className="block w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
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
          {/* COUNTRY ONLY /////////////////////////////////////////////////////////////////////////////////////////// */}
          <div className="flex flex-row">
              <input  type="radio" name="my-accordion-1"
                      onClick={() => {setRadioButton(2)}}
                      checked={isOpen2}
                      onChange={() => {}}
              />
              <p className="pl-2">Country</p>
          </div>
          <div className={clsx("w-full max-h-[40px] rounded-md",
                              {"place-type-visible": isOpen2,
                              "place-type-hidden": !isOpen2 })
                        }>
                {/* NAME OF COUNTRY */}
                <div className="flex flex-row">
                    <input disabled={!isOpen2} id="type" name="type" value="country" type="hidden" />
                    <input
                      disabled={!isOpen2} id="country" name="country" type="text" step="0.01"
                      placeholder='Name of country'
                      className="block w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 p-2"
                      aria-describedby="country-error"
                    />
                    <div id="country-error" aria-live="polite" aria-atomic="true">
                      {state.errors?.country &&
                        state.errors.country.map((error: string) => (
                          <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                            {error}
                          </p>
                      ))}
                    </div>
                </div>
          </div>
          {/* COUNTRY AND CITY ////////////////////////////////////////////////////////////////////////////////////// */}
          <div className="flex flex-row">
              <input  type="radio" name="my-accordion-1"
                      onClick={() => {setRadioButton(3)}}
                      checked={isOpen3}
                      onChange={() => {}}
              />
              <p className="pl-2">Country, City</p>
          </div>
          <div className={clsx("w-full max-h-[84px] rounded-md",
                              {"place-type-visible": isOpen3,
                              "place-type-hidden": !isOpen3 })
                         }>
                {/* NAME OF COUNTRY */}
                <div className="flex flex-row">
                    <input disabled={!isOpen3} id="type" name="type" value="country_city" type="hidden" />
                    <input
                      disabled={!isOpen3} id="country" name="country" type="text" step="0.01"
                      placeholder='Name of country'
                      className="block w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                      aria-describedby="country-error"
                    />
                    <div id="country-error" aria-live="polite" aria-atomic="true">
                      {state.errors?.country &&
                        state.errors.country.map((error: string) => (
                          <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                            {error}
                          </p>
                      ))}
                    </div>
                </div>

                {/* NAME OF CITY */}
                <div className="flex flex-row">
                    <input
                      disabled={!isOpen3} id="city" name="city" type="text"
                      step="0.01"
                      placeholder='Name of city'
                      className="block w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
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
          </div>
          {/* ANY: TITLE, DESC ////////////////////////////////////////////////////////////////////////////////////// */}
          <div className="flex flex-row">
              <input  type="radio" name="my-accordion-1"
                      onClick={() => {setRadioButton(4)}}
                      checked={isOpen4}
                      onChange={() => {}}
              />
              <p className="pl-2">Any - Title & Description</p>
          </div>
          <div className={clsx("w-full max-h-[124px] rounded-md",
                              {"place-type-visible": isOpen4,
                              "place-type-hidden": !isOpen4 })
                         }>
                {/* TITLE */}
                <div className="flex flex-row">
                    <input disabled={!isOpen4} id="type" name="type" value="any" type="hidden" />
                    <input
                      disabled={!isOpen4} id="title" name="title" type="text" step="0.01"
                      placeholder='Title'
                      className="block w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                      aria-describedby="title-error"
                    />
                    <div id="title-error" aria-live="polite" aria-atomic="true">
                      {state.errors?.title &&
                        state.errors.title.map((error: string) => (
                          <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                            {error}
                          </p>
                      ))}
                    </div>
                </div>

                {/* DESC */}
                <div className="flex flex-row">
                    <textarea
                      disabled={!isOpen4} id="desc" name="desc" rows={3} maxLength={200}
                      placeholder='Description (max number of characters: 200)'
                      className="block w-full resize-none rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                      aria-describedby="desc-error"
                    />
                    <div id="desc-error" aria-live="polite" aria-atomic="true">
                      {state.errors?.desc &&
                        state.errors.desc.map((error: string) => (
                          <p className="pl-2 leading-9 text-sm text-red-500" key={error}>
                            {error}
                          </p>
                      ))}
                    </div>
                </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between p-4">
          <Button type="submit">Create Place</Button>
        </div>
    </form>
  );
}
