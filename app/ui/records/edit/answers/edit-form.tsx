'use client';
import { create0rUpdateAnswer } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button1';
import MultiSelectWho from './multi-select-who';
import WhereRadio from '@/app/ui/records/whereradio';
import WhenRadio from '@/app/ui/records/whenradio';
import FakeWhenRadio from '@/app/ui/records/fakewhenradio';
import { SelectOptions, Person, Place, EventTime, SixAnswers } from '@/app/lib/interfaces';
import DateTimePicker from '@/app/ui/records/datepicker';
import { useState } from 'react';
import clsx from 'clsx';
import { InputMask } from '@react-input/mask';
import { useRef } from 'react';


export default function EditAnswerForm(
  { 
    record,
    whoOptions,
    whereOptions,
    whenOptions,
    page
  } : { 
        record: SixAnswers,
        whoOptions: Person[],
        whereOptions: Place[],
        whenOptions: EventTime[],
        page: number
      }) {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create0rUpdateAnswer, initialState);

  // arrange selected custom WHEN (if applicable) to be at the first index of the list
  // (this is so that setting the scroll position is no longer necessary on rendering the list)
  if (record.when.type === 6) {
    // find index of the selected WHEN in the whenOptions
    const n: number = whenOptions.findIndex((when: EventTime) => { return when.id === record.when.customID });
    // save the WHEN object from the array
    const whenObj: EventTime = whenOptions[n];
    // remove it from the whenOptions array
    whenOptions.splice(n, 1);
    // add it to the beginning of the array
    whenOptions.unshift(whenObj);
  }

  // arrange selected WHERE to be at the first index of the list
  // (this is so that setting the scroll position is no longer necessary on rendering the list)
  // 1. find index of the selected WHERE in the whereOptions
  const n = whereOptions.findIndex((where: Place) => { return where.id === record.where });
  // 2. save the WHERE object from the array
  const whereObj: Place = whereOptions[n];
  // 3. remove it from the whereOptions array
  whereOptions.splice(n, 1);
  // 4. add it to the beginning of the array
  whereOptions.unshift(whereObj);
  

  // The following variables are cooked up to set the intitial state of the two lists
  // that are presented to the user for picking a custom WHEN and a WHERE
  let placeObject: Place | undefined = whereOptions.find((place) => { return place.id === record.where });
  let placeHtml: any;
  if (typeof placeObject === "object") {
    placeHtml = initWhereDetailsHTML(placeObject, { "bg-green-100" : true, "bg-yellow-100" : false });
  } else {
    placeHtml = (<p></p>);
    placeObject = { id: 0, name: '', details: {}, type: '', sort_order: 0 }
  }
  let whenObject: EventTime | undefined = whenOptions.find((when) => { return when.id === record.when.customID });
  let whenHtml;
  if (typeof whenObject === "object" && record.when.type === 6) {
    whenHtml = initWhenDetailsHTML(whenObject);
  } else {
    whenHtml = <p></p>;
    whenObject = {id: 0, name: '', comments: '', type: '', sort_order: 0};
  }

  // the following pairs of state variables are used in the
  // place (where) and event-time (when) pick sections
  const [showWhereDetails, setshowWhereDetails] = useState(placeHtml);
  const [showWhenDetails, setShowWhenDetails] = useState(whenHtml);

  const [selectedPlaceRecord, setSelectedPlaceRecord] = useState(placeObject);
  const [selectedWhenRecord, setSelectedWhenRecord] = useState(whenObject);

  const [scrollWherePosition, setScrollWherePosition] = useState(0);
  const [scrollWhenPosition, setScrollWhenPosition] = useState(0);

  const [hoverWhereHighlight, setWhereHoverHighlight] = useState(false);
  const [hoverWhenHighlight, setWhenHoverHighlight] = useState(false);

  const [eventTime1, setEventTime1] = useState(record.when.type === 1);
  const [eventTime2, setEventTime2] = useState(record.when.type === 2);
  const [eventTime3, setEventTime3] = useState(record.when.type === 3);
  const [eventTime4, setEventTime4] = useState(record.when.type === 4);
  const [eventTime5, setEventTime5] = useState(record.when.type === 5);
  const [eventTime6, setEventTime6] = useState(record.when.type === 6);

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
      
        <input id="id" name="id" type="hidden" value={record.id} />

        <div className={clsx({"hidden" : page !== 0 })}>
          {/* PAGE 1 */}
          {/* WHO */}
          <p className="bg-slate-400 rounded-md border-1 border-slate-600 text-center font-bold">Record ID: ...{record.id.slice(-6)}, Part 1</p>
          <div className="bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
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
            <MultiSelectWho options={whoList2} initSelected={record.who} />
          </div>
          {/* WHAT */}
          <div className="bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1 h-[190px]" >
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
                rows={4}
                defaultValue={record.what}
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="what-error"
            />
          </div>
          {/* WHERE */}
          <div  className="flex flex-row h-[290px]"
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  whereList.current.scrollTop = scrollWherePosition;
                  handleWhereMouseOver(selectedPlaceRecord, true);
                  setWhereHoverHighlight(false);
                }}
          >
            <div className="bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
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
              <div className="overflow-auto border-1 border-slate-300 h-[220px] rounded-md" ref={whereList}>
                <WhereRadio
                  whereRadioOptions={[
                    {id: 'where', name: 'where', multi: 'no'},
                    {list: whereOptions},
                    record.where
                  ]}
                  whereMouseOver={handleWhereMouseOver}
                  hoverWhereHighlight={hoverWhereHighlight}
                >
                </WhereRadio>
              </div>
            </div>
            <div className="w-full flex mb-1">{showWhereDetails}</div>
          </div>
        </div>

        <div className={clsx({"hidden" : page !== 1 })}>
          {/* PAGE 2 */}
          <p className="bg-slate-400 rounded-md border-1 border-slate-600 text-center font-bold">Record ID: ...{record.id.slice(-6)}, Part 2</p>
          <div className="flex flex-col bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1 h-[406px]" >
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
            {/* SELECTORS TO CAUSE VARIOUS DATE STYLE INPUTS TO APPEAR */}
            <div className="flex flex-row">
              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md",
                                    {"opacity-60" : !eventTime1, "bg-indigo-100" : eventTime1 })}>
                <input type="checkbox" name="date_type_1" className="absolute top-1 left-1" onClick={() => { pickEventTimeStyle(1) }} checked={eventTime1} onChange={() => {}} />
                <p className="inline px-1">Date/Time</p><p>(since 1900)</p>
              </span>
              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md",
                                    {"opacity-60" : !eventTime2, "bg-indigo-100" : eventTime2 })}>
                <input type="checkbox" name="date_type_2" className="absolute top-1 left-1" onClick={() => { pickEventTimeStyle(2) }} checked={eventTime2} onChange={() => {}} />
                <p className="inline px-1">Year/Month</p><p>(since 1900)</p>
              </span>
              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md",
                                    {"opacity-60" : !eventTime3, "bg-indigo-100" : eventTime3 })}>
                <input type="checkbox" name="date_type_3" className="absolute top-1 left-1" onClick={() => { pickEventTimeStyle(3) }} checked={eventTime3} onChange={() => {}} />
                <p className="inline px-1">Date</p><p>(before 1900)</p>
              </span>
              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md",
                                    {"opacity-60" : !eventTime4, "bg-indigo-100" : eventTime4 })}>
                <input type="checkbox" name="date_type_4" className="absolute top-1 left-1" onClick={() => { pickEventTimeStyle(4) }} checked={eventTime4} onChange={() => {}} />
                <p className="inline px-1">Year/Month</p><p>(before 1900)</p>
              </span>
              <span className={clsx("basis-1/5 text-xs text-center mr-1 border-1 border-slate-400 relative rounded-md",
                                    {"opacity-40" : !eventTime5, "bg-indigo-100" : eventTime5 })}>
                <input type="checkbox" name="date_type_5" className="absolute top-1 left-1" onClick={() => { pickEventTimeStyle(5) }} checked={eventTime5} onChange={() => {}} />
                <p className="inline px-1">Year only</p><p>(before 1900)</p>
              </span>
            </div>
            {/* HIDDEN INPUT BOXES FOR VARIOUS DATE STYLES */}
            <div className="mt-1 min-h-[42px]">
              <div className={clsx({ "hidden" : !eventTime1 })}>
                <DateTimePicker
                    date_time={record.when.type === 1 ? convertDatePlusTime({date: record.when.date, time: record.when.time}) : {date: '01/01/1900', time: '12:00 AM'}}
                    view={["year", "month", "day"]}
                    form_data_name={"yr_mon_day"} />
              </div>
              <div className={clsx("flex flex-row", { "hidden" : !eventTime2 })}>
                <div className="basis-1/5"></div>
                <DateTimePicker
                    date_time={record.when.type === 2 ? convertDateYrMon(record.when.yr_mon) : {date: '01/01/1900', time: '12:00 AM'}}
                    view={["year", "month"]}
                    form_data_name={"yr_mon"} />
              </div>
              <div className={clsx("flex flex-row", { "hidden" : !eventTime3 })}>
                <div className="basis-2/5"></div>
                <InputMask className="w-[120px] border-1 border-slate-400 rounded-md text-center h-[40px] bg-indigo-100"
                           defaultValue={record.when.type === 3 ? record.when.date_only_pre1900 : 'dd/mm/yyyy' }
                           name="date_only_pre1900" mask="dd/mm/yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
                           showMask separate />
              </div>
              <div className={clsx("flex flex-row", { "hidden" : !eventTime4 })}>
                <div className="basis-3/5"></div>
                <InputMask className="w-[110px] border-1 border-slate-400 rounded-md text-center h-[40px] bg-indigo-100"
                           defaultValue={record.when.type === 4 ? record.when.year_mon_pre1900 : 'yyyy-mm'}
                           name="year_mon_pre1900" mask="yyyy-mm" replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
                           showMask separate />
              </div>
              <div className={clsx("flex flex-row items-center", { "hidden" : !eventTime5 })}>
                <div className="basis-4/5"></div>
                <InputMask className="w-[75px] border-1 border-slate-400 rounded-md text-center h-[40px] bg-indigo-100"
                           defaultValue={record.when.type === 5 ? record.when.yr_only_pre1900 : 'yyyy'}
                           name="yr_only_pre1900" mask="yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
                           showMask separate />
              </div>
            </div>
            <div className={clsx("w-full flex mb-1 rounded-md h-[90px]", { "hidden" : eventTime6 })} >
                <textarea
                    id="comments"
                    name="comments"
                    rows={4}
                    cols={80}
                    defaultValue={record.when.comments}
                    placeholder='Notes (optional)'
                    className="block w-full resize-none rounded-md border-1 bg-indigo-100 border-slate-400 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                    aria-describedby="what-error"
                  >
                  </textarea>
            </div>
            <div className="flex flex-row" 
                  onMouseLeave={(e) => {
                        e.stopPropagation();
                        whenList.current.scrollTop = scrollWhenPosition;
                        handleWhenMouseOver(selectedWhenRecord, true)
                        setWhenHoverHighlight(false);
                      }}
              >
              <div className={clsx(`basis-1/3 overflow-auto border-1 
                                    border-slate-300 mb-2 rounded-md`,
                                    { "h-[290px]" : eventTime6, "h-[200px]" : !eventTime6 })}  ref={whenList} >
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
                      record.when
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
              <div className={clsx("overflow-auto basis-2/3 w-full flex mb-2 border-1 rounded-md h-[288px]", { "hidden" : !eventTime6 })} >{showWhenDetails}</div>
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
                rows={4}
                defaultValue={record.why}
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
                defaultValue={record.how}
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="how-error"
            />
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <Button type="submit">Save Changes</Button>
        </div>
        <input id="operation" name="operation" type="hidden" value="update" />
    </form>
  );

  function convertDatePlusTime( datePlusTime: {date: string | undefined, time: string | undefined} ) : {date: string, time: string} {
    const returnDate = (typeof datePlusTime.date !== 'string') ? '01/01/1900' : datePlusTime.date;
    const returnTime = (typeof datePlusTime.time !== 'string') ? '12:00 AM' : datePlusTime.time;
    return {date: returnDate, time: returnTime};
  }
 
  function convertDateYrMon(year_mon: string | undefined) : {date: string, time: string} {
    const year = (typeof year_mon === 'undefined') ? '' : year_mon?.split(' ')[1];
    const mon = (typeof year_mon === 'undefined') ? '' : year_mon?.split(' ')[0];
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthNumber: number = monthList.indexOf(mon) + 1;
    const monthString: string = (typeof monthNumber === 'number') ? ((monthNumber < 10) ? '0' + monthNumber : '') : '';
    return  {date: `${monthString}/01/${year}`, time: '12:00 AM'};
  }

  function handleWhereMouseOver(record : Place, isSelected: boolean) {
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
    } else if (record.type === 'any' || record.type === 'country_and_desc') {
      setshowWhereDetails(
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
            <div className="px-1 font-bold bg-slate-200 pb-1 rounded-t-md">{record.name}</div>
            <div className="bg-slate-200 px-1 rounded-b-md">{record.details.desc}</div>
        </div>
      );
    } else if (record.type === 'country_city_and_desc') {
      
      setshowWhereDetails(
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
            <div className="px-1 font-bold bg-slate-200 pb-1 rounded-t-md">{record.details.city}, &nbsp;{record.name}</div>
            <div className="bg-slate-200 px-1 rounded-b-md">{record.details.desc}</div>
        </div>
      );
    }
  }

  function handleWhenMouseOver(record : EventTime, isSelected: boolean) {
    setWhenHoverHighlight(true);
    if (isSelected){
      setSelectedWhenRecord(record);
    }
    const scrollPosition = whenList.current.scrollTop;
    if (scrollPosition && isSelected) {
      setScrollWhenPosition(scrollPosition)
    }
    const bgColor: object = { "bg-green-100" : isSelected, "bg-yellow-100" : !isSelected };
    setShowWhenDetails(
      <div className={clsx("p-4 rounded-md w-full", bgColor)}>
        <div className="font-bold bg-slate-200 px-1 rounded-t-md">{record.name}</div>
        <div className="bg-slate-200 px-1 rounded-b-md" >{record.comments}</div>
      </div>
    );
  }

  function initWhenDetailsHTML(record: any) : any {
    const bgColor = { "bg-green-100" : true, "bg-yellow-100" : false };
    return (
      <div className={clsx("p-4 rounded-md w-full", bgColor)}>
        <div className="font-bold bg-slate-200 px-1 rounded-t-md">{record.name}</div>
        <div className="bg-slate-200 px-1 rounded-b-md" >{record.comments}</div>
      </div>
    );
  }

  function initWhereDetailsHTML(record: Place, bgColor: object) : any {
    switch (record.type) {
      case 'street_city_state': return (
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
          <div className="font-bold bg-slate-200 px-1 rounded-t-md">{record.name}</div>
          <div className="bg-slate-200 px-1">{record.details.street}</div>
          <div className="bg-slate-200 px-1">{record.details.city}</div>
          <div className="bg-slate-200 px-1 rounded-b-md" >{record.details.state}</div>
        </div>
      );
      case 'country_city': return (
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
          <div className="bg-slate-200 flex flex-row rounded-md">
            <div className="px-1 font-bold">{record.details.city},</div>
            <div>{record.name}</div>
          </div>
        </div>
      );
      case 'country': return (
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
            <div className="px-1 font-bold bg-slate-200 rounded-md">{record.name}</div>
        </div>
      );
      case 'any': return (
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
            <div className="px-1 font-bold bg-slate-200 pb-1 rounded-t-md">{record.name}</div>
            <div className="bg-slate-200 px-1 rounded-b-md">{record.details.desc}</div>
        </div>
      );
      case 'country_and_desc': return (
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
            <div className="px-1 font-bold bg-slate-200 pb-1 rounded-t-md">{record.name}</div>
            <div className="bg-slate-200 px-1 rounded-b-md">{record.details.desc}</div>
        </div>
      );
      case 'country_city_and_desc': return (
        <div className={clsx("p-4 rounded-md w-full", bgColor)}>
            <div className="px-1 font-bold bg-slate-200 pb-1 rounded-t-md">{record.details.city}, &nbsp;{record.name}</div>
            <div className="bg-slate-200 px-1 rounded-b-md">{record.details.desc}</div>
        </div>
      );
    }
  }
}