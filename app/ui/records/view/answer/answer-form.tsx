"use client"

import { Button } from "@/app/ui/button";
import clsx from 'clsx';
import { Person, Place, SixAnswers } from '@/app/lib/interfaces';

export default function AnswerForm({
    currentPage,
    dataPackage,
    page
  }: {
    currentPage: number;
    dataPackage: any[][];
    page: number;
  }) {

    const whoList: Person[] = dataPackage[0];
    const whereDefs: Place[] = dataPackage[1];
    const records: SixAnswers[] = dataPackage[2];
    

    const placeDetailsFunc = (recordWhereId: number, shallowEl: string, detailEl: string | null) => {
        const place: any = whereDefs.find((whereDef: {id: number}) => (whereDef.id === recordWhereId));
        if (detailEl !== null) {
            return place[shallowEl][detailEl];
        }
        return place[shallowEl];
    }
    
    return (
        <>
        {
          records.map((record: SixAnswers, i: number) => {
                return (<div key={i} className="flex flex-col bg-inherit md:pl-2">
                    
                  {/* PAGE 1 */}
                  <div className={clsx({"hidden" : page !== 0 })}>
                    {/* WHO */}
                    <div className="flex md:flex-row flex-col">
                        {/* col 1 */}
                        <div className={clsx("flex flex-col basis-1/4 pl-2 border-1 border-slate-400 rounded-md h-[100px] overflow-auto",
                                            {"bg-slate-200": ( currentPage & 1 ), "bg-sky-250": !( currentPage & 1 )})}>
                            <p className="font-bold">WHO</p>{
                            record.who.map((whoIndex: number, n: number) => {
                                const nameP = whoList.map((row: {index: number; name: string;}) => {
                                    if (row.index === whoIndex) {
                                        return (<p className="">{row.name}</p>)
                                    };
                                });
                                return nameP;
                            })
                        }
                        </div>
                    </div>
                    {/* WHAT */}
                    <div>
                        {([{label: 'WHAT'}])
                            .map((vars, j) => {
                                let data;
                                (j === 0) ? data = record.what : data = '';
                                return (
                                    <div key={j} className={clsx("flex flex-col rounded-md mt-px border-1 border-slate-400 pl-2 md:h-48 h-32", 
                                        {"even:bg-slate-250 odd:bg-slate-300": ( currentPage & 1 ),
                                        "even:bg-sky-250 odd:bg-sky-300": !( currentPage & 1 )})}>
                                        <p className="font-bold">{vars.label}</p>
                                        
                                        <textarea
                                            rows={7}
                                            value={data}
                                            readOnly
                                            className="rounded-md outline-none p-2 text-sm mb-1 p-2"
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* WHERE */}
                    <div className={clsx("pl-2 border-1 border-slate-400 rounded-md ",
                                        {"bg-slate-200": ( currentPage & 1 ), "bg-sky-250": !( currentPage & 1 )})}>
                        {([
                        {title: "WHERE:", level: 'name', sublevel: null},
                        {title: "Street: ", level: 'details', sublevel: 'street'},
                        {title: "City: ", level: 'details', sublevel: 'city'},
                        {title: "State: ", level: 'details', sublevel: 'state'}
                        ]).map((el: any, n: number) => {
                        return <div key={n} className="flex flex-row">
                        {/* left column */}
                        <div className={clsx("basis-16 text-right shrink-0 mr-2",
                            { "font-bold text-base": n === 0, "md:text-base text-sm": n > 0}
                            )}>{el.title}
                        </div>
                        {/* right column */}
                        <div className={clsx("text-left",
                            { "font-semibold text-base": n === 0, "md:text-base text-sm": n > 0}
                            )}> {placeDetailsFunc(record.where, el.level, el.sublevel)}
                        </div>
                        </div>
                        })}
                    </div>
                    <div className="pl-2 bg-yellow-100 rounded-md">When, Why, and How on next page . . .</div>
                  </div>

                  {/* PAGE 2 */}
                  <div className={clsx({"hidden" : page !== 1 })}>
                    {/* WHEN */}
                    <div className={clsx("pl-2 border-1 border-slate-400 rounded-md ",
                                            {"bg-slate-250": ( currentPage & 1 ), "bg-sky-300": !( currentPage & 1 )})}>
                            <p className="font-bold">WHEN</p>
                            <div>{record.when.date}</div>
                            <div>{record.when.time}</div>
                    </div>
                    {/* WHY, HOW */}
                    <div>
                        {([{label: 'WHY'},
                        {label: 'HOW'}])
                            .map((vars, j) => {
                                let data;
                                (j === 1) ? data = record.why : 
                                (j === 2) ? data = record.how : data = '';
                                return (
                                    <div key={j} className={clsx("flex flex-col rounded-md mt-px border-1 border-slate-400 pl-2 md:h-48 h-32", 
                                        {"even:bg-slate-250 odd:bg-slate-300": ( currentPage & 1 ),
                                        "even:bg-sky-250 odd:bg-sky-300": !( currentPage & 1 )})}>
                                        <p className="font-bold">{vars.label}</p>
                                        
                                        <textarea
                                            rows={7}
                                            value={data}
                                            readOnly
                                            className="rounded-md outline-none p-2 text-sm mb-1 p-2"
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                  </div>
                    
                  <Button cName={"w-24"} showdatalink={`/records/${record.id}/edit/answers`} buttontext={"Edit"} />
                  
                </div>);
            })
        }
        </>
    );
    
}
