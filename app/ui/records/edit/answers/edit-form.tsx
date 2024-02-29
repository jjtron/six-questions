'use client';
import { Button } from '@/app/ui/button1';
import MultiSelect from '@/app/ui/records/multiselect';
import WhereRadio from '@/app/ui/records/whereradio';
import { SelectOptions, WhoOptions } from '@/app/lib/interfaces';
import DateTimePicker from '@/app/ui/records/datepicker';
import { useFormState } from 'react-dom';
import { updateRecord } from '@/app/lib/actions';

export default function Form({whereOptions, whoOptions, record} : 
    { whereOptions: any, whoOptions: WhoOptions[], record: any}) {

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(updateRecord, initialState);

    let whoList: SelectOptions = {};
    whoOptions.map((el: WhoOptions) => {
        whoList[el.index] = el.name;
    });

  return (
    <form action={dispatch} className="flex flex-col md:pl-2 bg-inherit">
        <input id="id" name="id" type="hidden" value={record[0].id} />

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
                    {id: 'who', name: 'who', multi: 'yes'}, whoList, record[0].who
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
                rows={4}
                defaultValue={record[0].what}
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="what-error"
            />
        </div>

        <div className="bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1 h-[155px] overflow-auto" >
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
            <WhereRadio whereOptions={[
                    {id: 'where', name: 'where', multi: 'no'},
                    {list: whereOptions},
                    record[0].where
                ]}>
            </WhereRadio>
        </div>
                
        <div className="bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
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
            <DateTimePicker date_time={record[0].when} />
        </div>

        <div className="flex-col bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
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
              defaultValue={record[0].why}
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
                defaultValue={record[0].how}
                className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
                aria-describedby="how-error"
            />
        </div>
        <div className="flex flex-col items-center justify-between p-4">
            <Button type="submit">Save Changes</Button>
        </div>
    </form>
  );
}
