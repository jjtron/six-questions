'use client';
import { Button } from '@/app/ui/button1';
import MultiSelect from '@/app/ui/records/multiselect';
import WhereRadio from '@/app/ui/records/whereradio';
import { SelectOptions, WhoOptions } from '@/app/lib/interfaces';
import DateTimePicker from '@/app/ui/records/datepicker';

export default function Form({whereOptions, whoOptions, record} : 
    { whereOptions: any, whoOptions: WhoOptions[], record: any}) {

    let whoList: SelectOptions = {};
    whoOptions.map((el: WhoOptions) => {
        whoList[el.index] = el.name;
    });

  return (
    <form className="flex flex-col md:pl-2 bg-inherit">
        <input id="id" name="id" type="hidden" value={record[0].id} />

        <div className="flex-col w-40 bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
            <p className="font-bold">WHO</p>
            <MultiSelect options={[
                    {id: 'who', name: 'who', multi: 'yes'}, whoList, record[0].who
                ]}>
            </MultiSelect>
        </div>

        <div className="flex-col bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
        <p className="font-bold">WHAT</p>
        <textarea
            id="what"
            name="what"
            rows={4}
            className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
            aria-describedby="what-error"
        />
        </div>

        <div className="flex-col bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
            <p className="flex-col font-bold">WHERE</p>
            <WhereRadio whereOptions={[
                    {id: 'where', name: 'where', multi: 'no'},
                    {list: whereOptions},
                    record[0].where
                ]}>
            </WhereRadio>
        </div>

        <div className="flex-col bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
        <p className="flex-col font-bold">WHEN</p>
        <DateTimePicker />
        </div>

        <div className="flex-col bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
        <p className="font-bold">WHY</p>
        <textarea
            id="why"
            name="why"
            rows={4}
            className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
            aria-describedby="why-error"
        />
        </div>

        <div className="flex-col bg-slate-100 border-1 border-slate-400 rounded-md px-2 mb-1" >
        <p className="font-bold">HOW</p>
        <textarea
            id="how"
            name="how"
            rows={4}
            className="block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 mb-1 p-2"
            aria-describedby="how-error"
        />
        </div>

        <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button type="submit">Save Changes</Button>
        </div>


    </form>
  );
}
