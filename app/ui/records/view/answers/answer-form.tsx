"use client"

import { Button } from "@/app/ui/button";
import clsx from 'clsx';
import { Person, Place, EventTime, SixAnswers } from '@/app/lib/interfaces';

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
    const customWhenRecs: EventTime[] = dataPackage[3];
    

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
                    <p className="bg-slate-400 rounded-md border-1 border-slate-600 text-center font-bold">Record ID: ...{record.id.slice(-6)}, Part 1</p>
                    <div className="flex md:flex-row flex-col">
                        {/* col 1 */}
                        <div className="flex flex-col basis-1/4 pl-2 border-1 border-slate-400 rounded-md h-[211px] overflow-auto bg-slate-200" >
                            <p className="font-bold">WHO</p>{
                            record.who.map((whoIndex: number, n: number) => {
                                const nameP = whoList.map((row: {index: number; name: string;}) => {
                                    if (row.index === whoIndex) {
                                        return (<p key={n} className="">{row.name}</p>)
                                    };
                                });
                                return nameP;
                            })
                        }
                        </div>
                    </div>
                    {/* WHAT */}
                    
                        {([{label: 'WHAT'}])
                            .map((vars, j) => {
                                let data;
                                (j === 0) ? data = record.what : data = '';
                                return (
                                    <div key={j} className="flex flex-col bg-slate-200 rounded-md mt-px border-1 border-slate-400 pl-2 md:h-48 h-32" >
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
                    
                    {/* WHERE */}
                    <div className="pl-2 border-1 border-slate-400 rounded-md bg-slate-200 h-[200px]" >
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
                  </div>

                  {/* PAGE 2 */}
                  <div className={clsx({"hidden" : page !== 1 })}>
                    <p className="bg-slate-400 rounded-md border-1 border-slate-600 text-center font-bold">Record ID: ...{record.id.slice(-6)}, Part 2</p>
                    {/* WHEN */}
                    <div className="pl-2 border-1 border-slate-400 rounded-md bg-slate-200">
                            <p className="font-bold">WHEN</p>
                            {
                                (() => {
                                    if (record.when.type === 6 && record.when.customID !== undefined) {
                                        const whenRecord = customWhenRecs.find((item) => {
                                            return item.id === record.when['customID'];
                                        });
                                        return (<>
                                            <div className="flex flex-col mt-px pr-2 md:h-48 h-32" >
                                                <p className="bg-white rounded-t-md pl-2">{whenRecord?.name}</p>
                                                <textarea
                                                    rows={7}
                                                    value={whenRecord?.comments}
                                                    readOnly
                                                    className="rounded-b-md outline-none text-sm mb-1 pl-2 h-[156px]"
                                                />
                                            </div>
                                        </>);
                                    }
                                    switch (record.when.type) {
                                        case 5: return <p>{record.when['yr_only_pre1900']}</p>
                                        case 4: return <p>{record.when['year_mon_pre1900']}</p>
                                        case 3: return <p>{record.when['date_only_pre1900']}</p>
                                        case 2: return <p>{record.when['yr_mon']}</p>
                                        case 1: return <><span>{record.when['date']}</span>&nbsp;&nbsp;<span>{record.when['time']}</span></>
                                        default: return <>undefined</>;
                                    }
                                })()
                            }
                    </div>
                    {/* WHY, HOW */}
                        {([{label: 'WHY'},
                        {label: 'HOW'}])
                            .map((vars, j) => {
                                let data;
                                (j === 0) ? data = record.why : 
                                (j === 1) ? data = record.how : data = '';
                                return (
                                    <div key={j} className={clsx("flex flex-col rounded-md mt-px border-1 bg-slate-200 border-slate-400 p-2",
                                                           { "md:h-48 h-32" : record.when.type === 6, " md:h-[276px] h-32 " : record.when.type !== 6 } )} >
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
                  <div className="flex flex-col items-end">
                    <Button cName={"w-20"} showdatalink={`/records/${record.id}/edit/answers`} buttontext={"Edit"} />
                  </div>
                </div>);
            })
        }
        </>
    );
    
}
