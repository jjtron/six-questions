'use client';
import { createRecord } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button1';
import MultiSelect from '@/app/ui/records/multiselect';
import WhereRadio from '@/app/ui/records/whereradio';
import { SelectOptions, WhoOptions, Place } from '@/app/lib/interfaces';
import DateTimePicker from '@/app/ui/records/datepicker';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import clsx from 'clsx';

export default function Form({whoOptions, whereOptions} : { whoOptions: WhoOptions[], whereOptions: Place[] }) {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createRecord, initialState);
  const [showDetails, setShowDetails] = useState(<p></p>);

  let whoList: SelectOptions = {};
  whoOptions.map((el: WhoOptions) => {
    whoList[el.index] = el.name;
  });

  function handleMouseOver(record: any, highlight: boolean) {
    const h: object = { "bg-green-100" : highlight, "bg-yellow-100" : !highlight };
    if (record.type === 'street_city_state') {
      setShowDetails(
        <div className={clsx("p-4 rounded-md w-full", h)}>
          <div className="font-bold bg-slate-200 px-1 rounded-t-md">{record.name}</div>
          <div className="bg-slate-200 px-1">{record.details.street}</div>
          <div className="bg-slate-200 px-1">{record.details.city}</div>
          <div className="bg-slate-200 px-1 rounded-b-md" >{record.details.state}</div>
        </div>
      );
    } else if (record.type === 'country_city') {
      setShowDetails(
        <div className={clsx("p-4 rounded-md w-full", h)}>
          <div className="bg-slate-200 flex flex-row rounded-md">
            <div className="px-1 font-bold">{record.details.city},</div>
            <div>{record.name}</div>
          </div>
        </div>

      );
    }
    
  }

  return (
    <form action={dispatch} className="flex flex-col md:pl-2 bg-inherit">
      
          <input id="id" name="id" type="hidden" value={uuidv4()} />

          <div className="w-[15rem] bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
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
              <MultiSelect options={[
                  {id: 'who', name: 'who', multi: 'yes'}, whoList, null
                ]}>
              </MultiSelect>
          </div>

          <div className="bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
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
                rows={3}
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="what-error"
            />
          </div>

          <div className="flex flex-row">
            <div className="bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1 h-[185px] overflow-auto" >
              <div className="flex flex-row">
                <div className="font-bold">WHERE</div><div className="pl-2 font-normal">(scroll down for more choices)</div>
                <div id="where-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.where &&
                      state.errors.where.map((error: string) => (
                        <p className="pl-2 leading-6 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                    ))}
                </div>
              </div>
              <WhereRadio
                whereOptions={[
                  {id: 'where', name: 'where', multi: 'no'},
                  {list: whereOptions},
                  null
                ]}
                whereMouseOver={handleMouseOver}
              >
              </WhereRadio>
            </div>
            <div className="w-full flex mb-1">{showDetails}</div>
          </div>

          <div className="bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1 h-[100px]" >
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
            <DateTimePicker date_time={{date: '01/01/1900', time: '12:00 AM'}}/>
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

          <div className="flex flex-col items-center justify-between p-4">
            <Button type="submit">Create Record</Button>
          </div>

    </form>
  );
}