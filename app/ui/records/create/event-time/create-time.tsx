'use client';
import { createEventTime } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button1';
import { useState } from 'react';
import clsx from 'clsx';
import { useRef } from 'react';

export default function Form() {
  
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createEventTime, initialState);
  const [circaYearOnlyError, setCircaOnlyError] = useState({error: ''});
  const [circaYearOnlyInput, setCircaYearOnlyInput] = useState(false);
  const [circaYearRangeStartError, setCircaYearRangeStartError] = useState({error: '', value: ''});
  const [circaYearRangeEndError, setCircaYearRangeEndError] = useState({error: '', value: ''});
  const [circaYearRangeInput, setCircaYearRangeInput] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const el = <input /> as unknown as HTMLInputElement;
  const yearOnlyInput = useRef(el);
  const yearRangeStartInput = useRef(el);
  const yearRangeEndInput = useRef(el);

  function setRadioButton (option: number) {
      (option === 1) ? setIsOpen1(true) : setIsOpen1(false);
      (option === 2) ? setIsOpen2(true) : setIsOpen2(false);
  }

  function ensureLogicalTimeSequence(a: string, b: string) {
    // convert AD and BC to negative an positive respectfully
    const start = (a.substring(a.length - 2) === 'BC') ? -1 * Number(a.substring(0, a.length - 3)) : Number(a.substring(0, a.length - 3));
    const end = (b.substring(b.length - 2) === 'BC') ? -1 * Number(b.substring(0, b.length - 3)) : Number(b.substring(0, b.length - 3));
    if (a === '' || b === '') {
      return (<></>);
    } else if (start < end) {
      return (<></>);
    } else {
      return (<>begin &gt; end</>);
    }
  }

  return (
    <form action={dispatch} className="flex flex-col rounded-md bg-slate-200 p-4 md:p-6 md:ml-2">
        <div className="h-[520px]">
          {/* CIRCA ///////////////////////////////////////////////////////////////// */}
          <input disabled={!isOpen1} id="type" name="type" value="circa" type="hidden" />
          <div className="flex flex-row">
              <input  type="radio" name="my-accordion-1"
                      onClick={() => {setRadioButton(1)}}
                      checked={isOpen1}
                      onChange={() => {}}
              />
              <span className="inline font-bold">&nbsp;Circa</span>
          </div>
          <div className={clsx("w-full max-h-[152px] rounded-md",
                              {"record-type-enabled": isOpen1,
                               "record-type-disabled": !isOpen1 })
                        }>
                <div className="flex md:flex-row ">
                    <div className="basis-[195px] flex flex-col items-left grow-0 ml-1">
                      <div  className="fake-link text-xs/[22px] pl-1 hover:cursor-pointer w-fit"
                            onClick={() => { if (isOpen1) {
                                setCircaYearOnlyInput(true);
                                setCircaYearRangeInput(false);
                                yearRangeStartInput.current.value = '';
                                yearRangeEndInput.current.value = '';
                                setCircaYearRangeStartError({error: '', value: ''});
                                setCircaYearRangeEndError({error: '', value: ''});
                                ensureLogicalTimeSequence('', '');
                            }}
                        }
                      >yyyy AD/BC</div>
                      <div className="flex flex-row pb-2">
                        <input
                          ref={ yearOnlyInput }
                          disabled={!(isOpen1 && circaYearOnlyInput)} id="circa-yr-only" name="circa-yr-only" type="text" step="0.01"
                          className={clsx("block w-[78px] rounded-md border border-gray-400 text-sm outline-2 text-center")}
                          onChange={(e) => {
                            (new RegExp(/^\d{1,4}\s((AD|BC))$/).test(e.target.value))
                              ? setCircaOnlyError({error: ''})
                              : setCircaOnlyError({error: 'format error'});
                              console.log('hello');
                          }}
                          aria-describedby="circa-yr-only-error"
                        />
                        <div id="circa-yr-only-error" aria-live="polite" aria-atomic="true">
                          {state.errors?.circa &&
                            state.errors.circa.map((error: string) => (
                              <p className="px-2 leading-9 text-sm text-red-500" key={error}>{error}</p>
                          ))}
                          {(() => <p className="h-[38px] px-2 leading-9 text-xs text-red-500 w-fit">{circaYearOnlyError.error}</p>)()}
                        </div>
                      </div>
                    </div>

                    <div className="basis-[310px] flex flex-row">
                      <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center">
                          <div  className="fake-link text-xs/[22px] hover:cursor-pointer"
                                onClick={() => { if (isOpen1) {
                                  setCircaYearOnlyInput(false);
                                  setCircaYearRangeInput(true);
                                  yearOnlyInput.current.value = '';
                                  setCircaYearRangeStartError({error: '', value: ''});
                                  setCircaYearRangeEndError({error: '', value: ''});
                                  circaYearOnlyError.error = '';
                                }}}
                          >yyyy AD/BC - yyyy AD/BC</div>
                          <div className="flex flex-row items-center">
                            <input
                              ref={ yearRangeStartInput }
                              disabled={!(isOpen1 && circaYearRangeInput)} id="circa-yr-range-start" name="circa-yr-range-start" type="text" step="0.01"
                              className={clsx("block w-[78px] rounded-md border border-gray-400 text-sm outline-2 text-center p-2")}
                              onChange={(e) => {
                                (new RegExp(/^\d{1,4}\s((AD|BC))$/).test(e.target.value))
                                  ? setCircaYearRangeStartError({error: '', value: e.target.value})
                                  : setCircaYearRangeStartError({error: 'format error', value: ''});
                              }}
                              aria-describedby="circa-yr-range-error"
                            />
                            <p>-</p>
                            <input
                              ref={ yearRangeEndInput }
                              disabled={!(isOpen1 && circaYearRangeInput)} id="circa-yr-range-end" name="circa-yr-range-end" type="text" step="0.01"
                              className={clsx("block w-[78px] rounded-md border border-gray-400 text-sm outline-2 text-center p-2")}
                              onChange={(e) => {
                                (new RegExp(/^\d{1,4}\s((AD|BC))$/).test(e.target.value))
                                  ? setCircaYearRangeEndError({error: '', value: e.target.value})
                                  : setCircaYearRangeEndError({error: 'format error', value: ''});
                              }}
                              aria-describedby="circa-yr-range-error"
                            />
                          </div>
                        </div>
                      </div> {/* div 1 */}
                        <div className="flex flex-col">
                          <div className="h-[24px]"></div>
                          <div id="circa-yr-range-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.circa &&
                              state.errors.circa.map((error: string) => (
                                <p className="px-2 leading-9 text-sm text-red-500" key={error}>{error}</p>
                            ))}
                            {(() => {
                                if (circaYearRangeStartError.error !== '') {
                                  return (<><p className="h-[38px] px-2 leading-9 text-sm text-red-500">{circaYearRangeStartError.error}</p></>)
                                } else if (circaYearRangeEndError.error !== '') {
                                  return (<><p className="h-[38px] px-2 leading-9 text-sm text-red-500">{circaYearRangeEndError.error}</p></>)
                                } else {
                                  //const rangeStart = (document.getElementById('circa-yr-range-start') as HTMLInputElement)?.value;
                                  //const rangeEnd = (document.getElementById('circa-yr-range-end') as HTMLInputElement)?.value;
                                  return (
                                    <div className="h-[30px] px-2 leading-9 text-xs text-red-500 w-fit">{
                                      ensureLogicalTimeSequence(circaYearRangeStartError.value, circaYearRangeEndError.value)
                                    }</div>
                                  )
                                }
                              }
                            )()
                            }
                          </div>
                        </div>
                    </div>
                </div>

                {/* COMMENTS */}
                <div className="flex flex-row px-1">
                    <textarea
                      disabled={!isOpen1} id="comments" name="comments" rows={3} maxLength={200}
                      placeholder='Comments (max number of characters: 200)'
                      className="block w-full resize-none rounded-md border border-gray-400 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
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
          </div>
          {/* GENERAL ///////////////////////////////////////////////////////////////// */}
          <div className="flex flex-row">
              <input  type="radio" name="my-accordion-1"
                      onClick={() => {
                        setRadioButton(2);
                        yearRangeStartInput.current.value = '';
                        yearRangeEndInput.current.value = '';
                        setCircaYearRangeStartError({error: '', value: ''});
                        setCircaYearRangeEndError({error: '', value: ''});
                        ensureLogicalTimeSequence('', '');
                        circaYearOnlyError.error = '';
                        yearOnlyInput.current.value = '';
                      }}
                      checked={isOpen2}
                      onChange={() => {}}
              />
              <span className="inline font-bold">&nbsp;General</span>
          </div>
          <div className={clsx("w-full max-h-[124px] rounded-md",
                              {"record-type-enabled": isOpen2,
                               "record-type-disabled": !isOpen2 })
                        }>
                <div className="flex flex-row px-1">
                    <input disabled={!isOpen2} id="type" name="type" value="general" type="hidden" />
                    <input
                      disabled={!isOpen2} id="general" name="general" type="text" step="0.01"
                      placeholder='Title (up to 100 characters)'
                      className="block w-full rounded-md border border-gray-400 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
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
                <div className="flex flex-row px-1">
                    <textarea
                      disabled={!isOpen2} id="comments_2" name="comments_2" rows={3} maxLength={200}
                      placeholder='Comments (max number of characters: 200)'
                      className="block w-full resize-none rounded-md border border-gray-400 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                      aria-describedby="comments_2-error"
                    />
                    <div id="comments_2-error" aria-live="polite" aria-atomic="true">
                      {state.errors?.comments_2 &&
                        state.errors.comments_2.map((error: string) => (
                          <p className="px-2 leading-9 text-sm text-red-500" key={error}>
                            {error}
                          </p>
                      ))}
                    </div>
                </div>
          </div>


        </div>
        <div className="flex flex-col items-center justify-between p-4">
          <Button type="submit">Create Event Time</Button>
        </div>
    </form>
  );
}
