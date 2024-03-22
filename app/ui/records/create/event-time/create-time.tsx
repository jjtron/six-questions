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

  const textEl = <textarea /> as unknown as HTMLTextAreaElement;
  const circaComments =  useRef(textEl);
  const generalComments =  useRef(textEl);

  const el = <input /> as unknown as HTMLInputElement;
  const yearOnlyInput = useRef(el);
  const yearRangeStartInput = useRef(el);
  const yearRangeEndInput = useRef(el);
  const generalTitle = useRef(el);
  const circaType = useRef(<input /> as unknown as HTMLInputElement);

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
          <input ref={ circaType } disabled={!isOpen1} id="type" name="type" type="hidden" />
          <div className="flex flex-row items-center">
              <input  type="radio" name="my-accordion-1"
                      onClick={() => {setRadioButton(1)}}
                      checked={isOpen1}
                      onChange={() => {
                        generalComments.current.value = '';
                        generalTitle.current.value = '';
                        circaType.current.value = 'circa_tbd';
                      }}
              />
              <span className="font-bold">&nbsp;Circa</span>
              <span id="circa-tbd-error" aria-live="polite" aria-atomic="true" className="inline">
                          {state.errors?.circa_tbd &&
                            state.errors.circa_tbd.map((error: string) => (
                              <p className="px-2 leading-6 text-xs text-red-500" key={error}>{error}</p>
                          ))}
              </span>
          </div>
          <div className={clsx("w-full max-h-[148px] rounded-md",
                              {"record-type-enabled": isOpen1,
                               "record-type-disabled": !isOpen1 })
                        }>
                <div className="flex md:flex-row ">
                    <div className="basis-[195px] flex flex-col items-left grow-0 ml-1">
                      
                      <div  className="fake-link text-xs/[22px] pl-1 hover:cursor-pointer w-fit h-[22px]"
                            onClick={() => { if (isOpen1) {
                                setCircaYearOnlyInput(true);
                                setCircaYearRangeInput(false);
                                yearRangeStartInput.current.value = '';
                                yearRangeEndInput.current.value = '';
                                setCircaYearRangeStartError({error: '', value: ''});
                                setCircaYearRangeEndError({error: '', value: ''});
                                ensureLogicalTimeSequence('', '');
                                circaType.current.value = 'circa_yr';
                              }}
                            }
                      >yyyy AD/BC</div>
                      
                      <div className="flex flex-row pb-2 h-[42px] ">
                        <input
                          ref={ yearOnlyInput }
                          disabled={!(isOpen1 && circaYearOnlyInput)} id="circa-yr-only" name="circa_yr_only" type="text" step="0.01"
                          className={clsx("block w-[78px] rounded-md border border-gray-400 text-sm outline-2 text-center h-[38px]")}
                          onChange={(e) => {
                            (new RegExp(/^\d{1,4}\s((AD|BC))$/).test(e.target.value))
                              ? setCircaOnlyError({error: ''})
                              : setCircaOnlyError({error: 'format error'});
                          }}
                        />
                        {(() => <p className="px-2 leading-9 text-xs text-red-500 w-fit">{circaYearOnlyError.error}</p>)()}
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
                                  circaType.current.value = 'circa_range';
                                  setCircaYearRangeStartError({error: '', value: ''});
                                  setCircaYearRangeEndError({error: '', value: ''});
                                  circaYearOnlyError.error = '';
                                }}}
                          >yyyy AD/BC - yyyy AD/BC</div>
                          <div className="flex flex-row items-center">
                            <input
                              ref={ yearRangeStartInput }
                              disabled={!(isOpen1 && circaYearRangeInput)} id="circa-yr-range-start" name="circa_yr_range_start" type="text" step="0.01"
                              className={clsx("block w-[78px] rounded-md border border-gray-400 text-sm outline-2 text-center p-2")}
                              onChange={(e) => {
                                (new RegExp(/^\d{1,4}\s((AD|BC))$/).test(e.target.value))
                                  ? setCircaYearRangeStartError({error: '', value: e.target.value})
                                  : setCircaYearRangeStartError({error: 'format error', value: ''});
                              }}

                            />
                            <p>-</p>
                            <input
                              ref={ yearRangeEndInput }
                              disabled={!(isOpen1 && circaYearRangeInput)} id="circa-yr-range-end" name="circa_yr_range_end" type="text" step="0.01"
                              className={clsx("block w-[78px] rounded-md border border-gray-400 text-sm outline-2 text-center p-2")}
                              onChange={(e) => {
                                (new RegExp(/^\d{1,4}\s((AD|BC))$/).test(e.target.value))
                                  ? setCircaYearRangeEndError({error: '', value: e.target.value})
                                  : setCircaYearRangeEndError({error: 'format error', value: ''});
                              }}

                            />
                          </div>
                        </div>
                      </div> {/* div 1 */}
                        <div className="flex flex-col">

                          <div className="h-[24px]"></div>
                            {(() => {
                                  if (circaYearRangeStartError.error !== '') {
                                    return (<><p className="h-[38px] px-2 leading-8 text-xs text-red-500">{circaYearRangeStartError.error}</p></>)
                                  } else if (circaYearRangeEndError.error !== '') {
                                    return (<><p className="h-[38px] px-2 leading-8 text-xs text-red-500">{circaYearRangeEndError.error}</p></>)
                                  } else {
                                    return (
                                      <div className="h-[30px] px-2 leading-8 text-xs text-red-500 w-fit">{
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

                {/* COMMENTS */}
                <div className="flex flex-row px-1">
                    <textarea ref={ circaComments }
                      disabled={!isOpen1} id="comments" name="comments" rows={3} maxLength={200}
                      placeholder='Comments (max number of characters: 200)'
                      className="block w-full resize-none rounded-md border border-gray-400 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                      //aria-describedby="comments-error"
                    />
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
                        circaComments.current.value = '';
                      }}
                      checked={isOpen2}
                      onChange={() => {}}
              />
              <span className="inline font-bold">&nbsp;General</span>
              <span id="general-error" aria-live="polite" aria-atomic="true" className="inline">
                                {state.errors?.general &&
                                  state.errors.general.map((error: string) => (
                                    <p className="px-2 leading-6 text-xs text-red-500" key={error}>{error}</p>
                                ))}
                    </span>
          </div>
          <div className={clsx("w-full max-h-[124px] rounded-md",
                              {"record-type-enabled": isOpen2,
                               "record-type-disabled": !isOpen2 })
                        }>
                <div className="flex flex-row px-1">
                    <input disabled={!isOpen2} id="type" name="type" value="general" type="hidden" />
                    <input ref= { generalTitle }
                      disabled={!isOpen2} id="general" name="general" type="text" step="0.01"
                      placeholder='Title (up to 100 characters)'
                      className="block w-full rounded-md border border-gray-400 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                    />
                </div>

                {/* COMMENTS */}
                <div className="flex flex-row px-1">
                    <textarea ref={ generalComments }
                      disabled={!isOpen2} id="comments_2" name="comments_2" rows={3} maxLength={200}
                      placeholder='Comments (max number of characters: 200)'
                      className="block w-full resize-none rounded-md border border-gray-400 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                    />
                </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between p-4">
          <Button type="submit">Create Event Time</Button>
        </div>
    </form>
  );
}
