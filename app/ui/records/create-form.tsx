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
    <form action={dispatch}>
      <p>Createform</p>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <input
                id="id"
                name="id"
                readOnly
                type="text"
                step="0.01"
                value={uuidv4()}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                style={{color: 'white', backgroundColor: 'black'}}
              />
      <MultiSelect options={[
          {id: 'who', name: 'who', multi: 'yes'}, whoList
        ]}>
      </MultiSelect>
      <input
                id="what"
                name="what"
                type="text"
                step="0.01"
                placeholder="what"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="what-error"
                style={{color: 'white', backgroundColor: 'black'}}
              />
      <WhereRadio whereOptions={[
          {id: 'where', name: 'where', multi: 'no'},
          {list: whereOptions}
        ]}>
      </WhereRadio>
      <DateTimePicker />
      <input
                id="why"
                name="why"
                type="text"
                step="0.01"
                placeholder="why"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="why-error"
                style={{color: 'white', backgroundColor: 'black'}}
              />
      <input
                id="how"
                name="how"
                type="text"
                step="0.01"
                placeholder="how"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="how-error"
                style={{color: 'white', backgroundColor: 'black'}}
              />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button type="submit">Create Record</Button>
      </div>
      </div>
    </form>
  );
}
