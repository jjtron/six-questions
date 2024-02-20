'use client';
import { createRecord } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button1';
import MultiSelect from '@/app/ui/records/multiselect';
import WhereRadio from '@/app/ui/records/whereradio';
import { SelectOptions, WhoOptions } from '@/app/lib/interfaces';
import DateTimePicker from '@/app/ui/records/datepicker';
import { v4 as uuidv4 } from 'uuid';

export default function Form({whereOptions, whoOptions} : 
  { whereOptions: any, whoOptions: WhoOptions[]}) {
  
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createRecord, initialState);

  let whoList: SelectOptions = {};
  whoOptions.map((el: WhoOptions) => {
    whoList[el.index] = el.name;
  });

  return (
    <form action={dispatch} className="flex flex-col md:pl-2 bg-inherit">
      
          <input
              id="id" name="id" type="hidden" value={uuidv4()}
          />

          <div className="flex-col w-40 bg-slate-100 border-1 border-slate-400 rounded-md px-2" >
            <p className="font-bold">WHO</p>
            <MultiSelect options={[
                {id: 'who', name: 'who', multi: 'yes'}, whoList
              ]}>
            </MultiSelect>
          </div>

          <div className="flex-col bg-slate-100 border-1 border-slate-400 rounded-md px-2 pb-2" >
            <p className="font-bold">WHAT</p>
            <textarea
                      id="what"
                      name="what"
                      rows={4}
                      className="peer block w-full rounded-md border border-gray-200 p-2text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby="what-error"
            />
          </div>

          <div className="flex-col bg-slate-100 border-1 border-slate-400 rounded-md px-2" >
            <p className="flex-col font-bold">WHERE</p>
            <WhereRadio whereOptions={[
                {id: 'where', name: 'where', multi: 'no'},
                {list: whereOptions}
              ]}>
            </WhereRadio>
          </div>
          <DateTimePicker />
          <input
                    id="why"
                    name="why"
                    type="text"
                    step="0.01"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="why-error"
                    style={{color: 'white', backgroundColor: 'black'}}
                  />
          <input
                    id="how"
                    name="how"
                    type="text"
                    step="0.01"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="how-error"
                    style={{color: 'white', backgroundColor: 'black'}}
                  />
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <Button type="submit">Create Record</Button>
          </div>

    </form>
  );
}
