'use client';
import { create0rUpdateAnswer } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button1';
import MultiSelectWho from './multi-select-who';
import WhereRadio from '@/app/ui/records/whereradio';
import WhenRadio from '@/app/ui/records/whenradio';
import FakeWhenRadio from '@/app/ui/records/fakewhenradio';
import { SelectOptions, Person, Place, EventTime } from '@/app/lib/interfaces';
import DateTimePicker from '@/app/ui/records/datepicker';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import clsx from 'clsx';
import { InputMask } from '@react-input/mask';
import { useRef } from 'react';


export default function AnswerForm(
    { 
      whoOptions,
      whereOptions,
      whenOptions,
      page
    } : { 
          whoOptions: Person[],
          whereOptions: Place[],
          whenOptions: EventTime[],
          page: number
        })
{

  const mediaWidth: number = (typeof window !== 'undefined') ? window.innerWidth : 2000;
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create0rUpdateAnswer, initialState);

  // the following pairs of state variables are used in the
  // place (where) and event-time (when) pick sections
  const [showWhereDetails, setshowWhereDetails] = useState(<div className="w-full flex border-1 bg-slate-100 rounded-md h-[300px]">&nbsp;</div>);
  const [showWhenDetails, setShowWhenDetails] = useState(<p></p>);

  const [selectedPlaceRecord, setSelectedPlaceRecord] = useState({});
  const [selectedWhenRecord, setSelectedWhenRecord] = useState({});

  const [scrollWherePosition, setScrollWherePosition] = useState(0);
  const [scrollWhenPosition, setScrollWhenPosition] = useState(0);

  const [hoverWhereHighlight, setWhereHoverHighlight] = useState(false);
  const [hoverWhenHighlight, setWhenHoverHighlight] = useState(false);

  const [eventTime1, setEventTime1] = useState(false);
  const [eventTime2, setEventTime2] = useState(false);
  const [eventTime3, setEventTime3] = useState(false);
  const [eventTime4, setEventTime4] = useState(false);
  const [eventTime5, setEventTime5] = useState(false);
  const [eventTime6, setEventTime6] = useState(false);

  function pickEventTimeStyle (n: number) {
    (n === 1) ? setEventTime1(true) : setEventTime1(false);
    (n === 2) ? setEventTime2(true) : setEventTime2(false);
    (n === 3) ? setEventTime3(true) : setEventTime3(false);
    (n === 4) ? setEventTime4(true) : setEventTime4(false);
    (n === 5) ? setEventTime5(true) : setEventTime5(false);
    (n === 6) ? setEventTime6(true) : setEventTime6(false);
  }
  let whoList2: SelectOptions = {};
  whoOptions.map((el: Person) => {
    whoList2[el.index] = { name: el.name, comments: el.comments }
  });

  const whereList = useRef(<div></div> as unknown as HTMLDivElement);
  const whenList = useRef(<div></div> as unknown as HTMLDivElement);

  return (
    <form action={dispatch} className="flex flex-col md:pl-2 bg-inherit">
      
        <input id="id" name="id" type="hidden" value={uuidv4()} />

        <div className={clsx({ "hidden" : page !== 0 && mediaWidth > 326 })}>
          {/* PAGE 1 */}
          {/* WHO */}
          <p className={clsx(`bg-slate-400 rounded-md border-1
                              border-slate-600 text-center font-bold`,
                              { "hidden" : mediaWidth <= 326 }
                        )}>Part 1: Who, What, Where</p>
          <div className="w-full bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1 h-[176px] max-[320px]:h-[306px]" >
            <div className="flex flex-row">
                <div className="font-bold">WHO</div>
                <div id="who-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.who &&
                      state.errors.who.map((error: string) => (
                        <p className="pl-2 leading-6 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                    ))}
                </div>
            </div>
            <MultiSelectWho
                options={whoList2}>
            </MultiSelectWho>
          </div>
          {/* WHAT */}
          <div className="bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1 h-[150px] max-[320px]:h-[200px]" >
            <div className="flex flex-row">
              <div className="font-bold">WHAT</div>
              <div id="what-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.what &&
                    state.errors.what.map((error: string) => (
                      <p className="pl-2 leading-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                  ))}
              </div>
            </div>
            <textarea
                id="what"
                name="what"
                rows={5}
                className="resize-none block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2 "
                aria-describedby="what-error"
            />
          </div>
          {/* WHERE */}
          <div  className={clsx("flex flex-row", { "flex-col bg-white rounded-md mb-1" : mediaWidth <= 326 })}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  whereList.current.scrollTop = scrollWherePosition;
                  handleWhereMouseOver(selectedPlaceRecord, true);
                  setWhereHoverHighlight(false);
                }}
          >
            <div className="bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1 h-[300px] max-[320px]:h-[205px]" >
              <div className="flex flex-row">
                <div className="font-bold">WHERE</div>
                <div id="where-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.where &&
                      state.errors.where.map((error: string) => (
                        <p className="pl-2 leading-6 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                    ))}
                </div>
              </div>
              <div className="text-xs">(scroll down for more options)</div>
              <div className="overflow-auto border-1 border-slate-300 h-[230px] max-[320px]:h-[140px] rounded-md" ref={whereList} > 
                <WhereRadio
                  whereRadioOptions={[
                    {id: 'where', name: 'where', multi: 'no'},
                    {list: whereOptions},
                    null
                  ]}
                  whereMouseOver={handleWhereMouseOver}
                  hoverWhereHighlight={hoverWhereHighlight}
                >
                </WhereRadio>
              </div>
            </div>
            <div className="w-full flex mb-1 text-base max-[320px]:text-xs max-[320px]:h-[140px]">{showWhereDetails}</div>
          </div>
        </div>

        <div className={clsx({"hidden" : page !== 1 && mediaWidth > 326 })}>
          {/* PAGE 2 */}
          <p className={clsx(`bg-slate-400 rounded-md border-1
                              border-slate-600 text-center font-bold`,
                              { "hidden" : mediaWidth <= 326 }
                        )}>Part 2: When, Why, How</p>
          <div className="flex flex-col bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1 h-[406px] max-[320px]:h-[510px]" >
            <div className="flex flex-row">
              <div className="font-bold">WHEN</div>
              <div id="when-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.when &&
                    state.errors.when.map((error: string) => (
                      <p className="pl-2 leading-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                  ))}
              </div>
            </div>

            {/* SELECTORS AND INPUTS TO CAUSE VARIOUS DATE STYLE INPUTS TO APPEAR (SLIM MEDIA) */}
            <div className={clsx("flex flex-col", { "hidden" : mediaWidth > 326 })}>
              
              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md", {"opacity-60" : !eventTime1, "bg-indigo-100" : eventTime1 })}>
                <input type="checkbox" name="date_type_1" className="absolute top-0.5 left-1" onClick={() => { pickEventTimeStyle(1) }} checked={eventTime1} onChange={() => {}} />
                <p className="px-1">Date/Time (since 1900)</p>
              </span>
              <div className={clsx({ "hidden" : !eventTime1 })}>
                <DateTimePicker
                    date_time={{date: '01/01/1900', time: '12:00 AM'}}
                    view={["year", "month", "day"]}
                    form_data_name={"yr_mon_day"} />
              </div>

              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md", {"opacity-60" : !eventTime2, "bg-indigo-100" : eventTime2 })}>
                <input type="checkbox" name="date_type_2" className="absolute top-0.5 left-1" onClick={() => { pickEventTimeStyle(2) }} checked={eventTime2} onChange={() => {}} />
                <p className="px-1">Year/Month (since 1900)</p>
              </span>
              <div className={clsx("flex flex-row", { "hidden" : !eventTime2 })}>
                <DateTimePicker
                    date_time={{date: '01/01/1900', time: '12:00 AM'}}
                    view={["year", "month"]}
                    form_data_name={"yr_mon"} />
              </div>

              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md", {"opacity-60" : !eventTime3, "bg-indigo-100" : eventTime3 })}>
                <input type="checkbox" name="date_type_3" className="absolute top-0.5 left-1" onClick={() => { pickEventTimeStyle(3) }} checked={eventTime3} onChange={() => {}} />
                <p className="inline px-1">Date (before 1900)</p>
              </span>
              <div className={clsx("flex flex-row", { "hidden" : !eventTime3 })}>
                <InputMask className="w-[120px] border-1 border-slate-300 rounded-md text-center bg-indigo-100" name="date_only_pre1900" mask="dd/mm/yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }} showMask separate />
              </div>

              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md", {"opacity-60" : !eventTime4, "bg-indigo-100" : eventTime4 })}>
                <input type="checkbox" name="date_type_4" className="absolute top-0.5 left-1" onClick={() => { pickEventTimeStyle(4) }} checked={eventTime4} onChange={() => {}} />
                <p className="inline px-1">Year/Month (before 1900)</p>
              </span>
              <div className={clsx("flex flex-row", { "hidden" : !eventTime4 })}>
                <InputMask className="w-[110px] border-1 border-slate-300 rounded-md text-center bg-indigo-100" name="year_mon_pre1900" mask="yyyy-mm" replacement={{ d: /\d/, m: /\d/, y: /\d/ }} showMask separate />
              </div>

              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md", {"opacity-60" : !eventTime5, "bg-indigo-100" : eventTime5 })}>
                <input type="checkbox" name="date_type_5" className="absolute top-0.5 left-1" onClick={() => { pickEventTimeStyle(5) }} checked={eventTime5} onChange={() => {}} />
                <p className="inline px-1">Year only (before 1900)</p>
              </span>
              <div className={clsx("flex flex-row items-center", { "hidden" : !eventTime5 })}>
                <InputMask className="w-[100px] border-1 border-slate-300 rounded-md text- bg-indigo-100" name="yr_only_pre1900" mask="yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }} showMask separate />
              </div>

            </div>


            {/* SELECTORS TO CAUSE VARIOUS DATE STYLE INPUTS TO APPEAR (WIDE MEDIA) */}
            <div className={clsx("flex flex-row", { "hidden" : mediaWidth <= 326 })}>
              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md", {"opacity-60" : !eventTime1 })}>
                <input type="checkbox" name="date_type_1" className="absolute top-1 left-1" onClick={() => { pickEventTimeStyle(1) }} checked={eventTime1} onChange={() => {}} />
                <p className="inline px-1">Date/Time</p><p>(since 1900)</p>
              </span>
              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md", {"opacity-60" : !eventTime2 })}>
                <input type="checkbox" name="date_type_2" className="absolute top-1 left-1" onClick={() => { pickEventTimeStyle(2) }} checked={eventTime2} onChange={() => {}} />
                <p className="inline px-1">Year/Month</p><p>(since 1900)</p>
              </span>
              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md", {"opacity-60" : !eventTime3 })}>
                <input type="checkbox" name="date_type_3" className="absolute top-1 left-1" onClick={() => { pickEventTimeStyle(3) }} checked={eventTime3} onChange={() => {}} />
                <p className="inline px-1">Date</p><p>(before 1900)</p>
              </span>
              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md", {"opacity-60" : !eventTime4 })}>
                <input type="checkbox" name="date_type_4" className="absolute top-1 left-1" onClick={() => { pickEventTimeStyle(4) }} checked={eventTime4} onChange={() => {}} />
                <p className="inline px-1">Year/Month</p><p>(before 1900)</p>
              </span>
              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md", {"opacity-40" : !eventTime5 })}>
                <input type="checkbox" name="date_type_5" className="absolute top-1 left-1" onClick={() => { pickEventTimeStyle(5) }} checked={eventTime5} onChange={() => {}} />
                <p className="inline px-1">Year only</p><p>(before 1900)</p>
              </span>
            </div>
            {/* HIDDEN INPUT BOXES FOR VARIOUS DATE STYLES */}
            <div className={clsx("mt-1 min-h-[42px]", { "hidden" : mediaWidth <= 326 })}>
              <div className={clsx({ "hidden" : !eventTime1 })}>
                <DateTimePicker
                    date_time={{date: '01/01/1900', time: '12:00 AM'}}
                    view={["year", "month", "day"]}
                    form_data_name={"yr_mon_day"} />
              </div>
              <div className={clsx("flex flex-row", { "hidden" : !eventTime2 })}>
                <div className="basis-1/5"></div>
                <DateTimePicker
                    date_time={{date: '01/01/1900', time: '12:00 AM'}}
                    view={["year", "month"]}
                    form_data_name={"yr_mon"} />
              </div>
              <div className={clsx("flex flex-row", { "hidden" : !eventTime3 })}>
                <div className="basis-2/5"></div>
                <InputMask className="w-[120px] border-1 border-slate-300 rounded-md text-center bg-indigo-100" name="date_only_pre1900" mask="dd/mm/yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }} showMask separate />
              </div>
              <div className={clsx("flex flex-row", { "hidden" : !eventTime4 })}>
                <div className="basis-3/5"></div>
                <InputMask className="w-[110px] border-1 border-slate-300 rounded-md text-center bg-indigo-100" name="year_mon_pre1900" mask="yyyy-mm" replacement={{ d: /\d/, m: /\d/, y: /\d/ }} showMask separate />
              </div>
              <div className={clsx("flex flex-row items-center", { "hidden" : !eventTime5 })}>
                <div className="basis-4/5"></div>
                <InputMask className="w-[100px] border-1 border-slate-300 rounded-md text-center bg-indigo-100" name="yr_only_pre1900" mask="yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }} showMask separate />
              </div>
            </div>
            <div className={clsx("w-full flex mb-1 rounded-md h-[90px]",
                                { "hidden" : eventTime6 },
                                { "hidden" : !eventTime1 && !eventTime2 && !eventTime3 && !eventTime4 && !eventTime5&& !eventTime6 })} >
                  <textarea id="comments" name="comments" rows={4} cols={80} defaultValue=""
                            placeholder={clsx("Notes:",
                                             {' Date/Time (since 1900), (optional)' : eventTime1 },
                                             {' Year/Month (since 1900), (optional)' : eventTime2 },
                                             {' Date (before 1900), (optional)' : eventTime3 },
                                             {' Year/Month (before 1900), (optional)' : eventTime4 },
                                             {' Year only (before 1900), (optional)' : eventTime5 }, )}
                            className="block w-full resize-none rounded-md border-1 bg-indigo-100 border-slate-400 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                  >
                  </textarea>
            </div>
            <div className="flex flex-row max-[320px]:flex-col max-[320px]:min-h-[372px]"
                  onMouseLeave={(e) => {
                        e.stopPropagation();
                        whenList.current.scrollTop = scrollWhenPosition;
                        handleWhenMouseOver(selectedWhenRecord, true)
                        setWhenHoverHighlight(false);
                      }}
              >
              <div className={clsx(`max-[320px]:basis-2/5 basis-1/3 overflow-auto border-1 
                                    border-slate-300 mb-2 rounded-md`,
                                    { "h-[290px]" : eventTime6 },
                                    { "h-[200px]" : eventTime1 || eventTime2 || eventTime3 || eventTime4 || eventTime5 },
                                    { "h-[290px]" : !eventTime1 && !eventTime2 && !eventTime3 && !eventTime4 && !eventTime5 && !eventTime6 } )}  ref={whenList} >
                  <div className="text-xs w-[195px] pt-1 pl-1">
                    <input type="checkbox" name="date_type_6" onClick={() => { pickEventTimeStyle(6) }} 
                            checked={eventTime6} onChange={() => {}} />
                    <span>&nbsp;&nbsp;Custom event-time styles (scroll down for more options)</span>
                  </div>
                  <div className={clsx( { "hidden" : !eventTime6 })}>
                  <WhenRadio
                    whenRadioOptions={[
                      {id: 'where', name: 'where', multi: 'no'},
                      {list: whenOptions},
                      null
                    ]}
                    whenMouseOver={handleWhenMouseOver}
                    hoverWhenHighlight={hoverWhenHighlight}
                    customWhenClick={() => {pickEventTimeStyle(6)}}
                  >
                  </WhenRadio>
                  </div>
                  <div className={clsx( { "hidden" : eventTime6, "opacity-40" : !eventTime6 })}>
                  <FakeWhenRadio
                    whenRadioOptions={[
                      {id: 'where', name: 'where', multi: 'no'},
                      {list: whenOptions},
                      null
                    ]}
                  >
                  </FakeWhenRadio>
                  </div>
              </div>
              <div className={clsx("max-[320px]:basis-3/5 basis-2/3", { "hidden" : eventTime6 })} ></div>
              <div className={clsx("max-[320px]:basis-3/5 basis-2/3 w-full flex mb-2 border-1 rounded-md", { "hidden" : !eventTime6 })} >{showWhenDetails}</div>
            </div>
          </div>

          <div className="bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
            <div className="flex flex-row">
              <div className="font-bold">WHY</div>
              <div id="why-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.why &&
                    state.errors.why.map((error: string) => (
                      <p className="pl-2 leading-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                  ))}
              </div>
            </div>
            <textarea
                id="why"
                name="why"
                rows={3}
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="why-error"
            />
          </div>

          <div className="bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
            <div className="flex flex-row">
              <div className="font-bold">HOW</div>
              <div id="how-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.how &&
                    state.errors.how.map((error: string) => (
                      <p className="pl-2 leading-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                  ))}
              </div>
            </div>
            <textarea
                id="how"
                name="how"
                rows={3}
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="how-error"
            />
          </div>
        </div>

        <div className={clsx("flex flex-col items-end justify-between", { "h-[25px] mb-6" : mediaWidth <= 326 })}>
          <Button type="submit">Create Record</Button>
        </div>
        <input id="operation" name="operation" type="hidden" value="create" />
    </form>
  );

  function handleWhereMouseOver(record : any, isSelected: boolean) {
    setWhereHoverHighlight(true);
    if (isSelected){
      setSelectedPlaceRecord(record);
    }
    const scrollPosition = whereList.current.scrollTop;
    if (scrollPosition && isSelected) {
      setScrollWherePosition(scrollPosition)
    }
    const bgColor: object = { "bg-green-100" : isSelected, "bg-yellow-100" : !isSelected };
    if (record.type === 'street_city_state') {
      setshowWhereDetails(
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
          <div className="font-bold bg-slate-200 px-1 rounded-t-md">{record.name}</div>
          <div className="bg-slate-200 px-1">{record.details.street}</div>
          <div className="bg-slate-200 px-1">{record.details.city}</div>
          <div className="bg-slate-200 px-1 rounded-b-md" >{record.details.state}</div>
        </div>
      );
    } else if (record.type === 'country_city') {
      setshowWhereDetails(
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
          <div className="bg-slate-200 flex flex-row rounded-md">
            <div className="px-1 font-bold">{record.details.city},</div>
            <div>{record.name}</div>
          </div>
        </div>
      );
    } else if (record.type === 'country') {
      setshowWhereDetails(
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
            <div className="px-1 font-bold bg-slate-200 rounded-md">{record.name}</div>
        </div>
      );
    } else if (record.type === 'any') {
      setshowWhereDetails(
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
            <div className="px-1 font-bold bg-slate-200 pb-1 rounded-t-md">{record.name}</div>
            <div className="bg-slate-200 px-1 rounded-b-md">{record.details.desc}</div>
        </div>
      );
    } else if (record.type === 'country_and_desc') {
      setshowWhereDetails(
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
            <div className="px-1 font-bold bg-slate-200 pb-1 rounded-t-md">{record.name}</div>
            <div className="bg-slate-200 px-1 rounded-b-md">{record.details.desc}</div>
        </div>
      );
    } else if (record.type === 'country_city_and_desc') {
      setshowWhereDetails(
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
            <div className="flex flex-row">
              <div className="px-1 font-bold bg-slate-200 pb-1 rounded-l-md">{record.details.city},</div>
              <div className="px-1 font-normal bg-slate-200 pb-1 rounded-r-md">{record.name}</div>
            </div>
            <div className="bg-slate-200 px-1 rounded-b-md">{record.details.desc}</div>
        </div>
      );
    }
  }

  function handleWhenMouseOver(record : any, isSelected: boolean) {
    setWhenHoverHighlight(true);
    if (isSelected){
      setSelectedWhenRecord(record);
    }
    const scrollPosition = whenList.current.scrollTop;
    if (scrollPosition && isSelected) {
      setScrollWhenPosition(scrollPosition)
    }
    const bgColor: object = { "bg-green-100" : isSelected, "bg-yellow-100" : !isSelected };
    if (record.type === 'circa_yr') {
      setShowWhenDetails(
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
          <div className="font-bold bg-slate-200 px-1 rounded-t-md">{record.name}</div>
          <div className="bg-slate-200 px-1 rounded-b-md" >{record.comments}</div>
        </div>
      );
    } else if (record.type === 'circa_range') {
      setShowWhenDetails(
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
          <div className="font-bold bg-slate-200 px-1 rounded-t-md">{record.name}</div>
          <div className="bg-slate-200 px-1 rounded-b-md" >{record.comments}</div>
        </div>
      );
    } else if (record.type === 'general') {
      setShowWhenDetails(
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
          <div className="font-bold bg-slate-200 px-1 rounded-t-md">{record.name}</div>
          <div className="bg-slate-200 px-1 rounded-b-md" >{record.comments}</div>
        </div>
      );
    }
  }
}