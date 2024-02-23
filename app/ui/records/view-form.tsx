"use server"
import { getDbData } from "@/app/lib/database";
import { Button } from "@/app/ui/button";
import clsx from 'clsx';
import { fetchFilteredRecords } from '@/app/lib/database';

/* for demo only
import { Suspense } from 'react';
import SixAnswersSkeleton from '@/app/ui/skeletons';
*/

export default async function Form({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) {
    //const records: any = (await getDbData(` SELECT * FROM six_questions; `)).details.rows;
    const whoList: any = (await getDbData(`SELECT * FROM whos;`)).details.rows;
    const whereDefs: any = (await getDbData(`SELECT * FROM wheres`)).details.rows;
    const records = await fetchFilteredRecords(query, currentPage);

    const placeDetailsFunc = (recordWhereId: number, shallowEl: string, detailEl: string | null) => {
        const place = whereDefs.find((whereDef: {id: number}) => (whereDef.id === recordWhereId));
        if (detailEl !== null) {
            return place[shallowEl][detailEl];
        }
        return place[shallowEl];
    }
    
    return (
        <>
        {
          records.map((record: 
            {
                id: string[]; who: Array<any>; what: string[];
                where: number; when: {date: string[]; time: string[]}; why: string[];
                how: string[];
            }, i: any) => {
                return (<div key={i} className="flex flex-col bg-inherit md:pl-2">
                    {/* TOP ROW GROUP*/}
                    <div className="flex md:flex-row flex-col">
                        {/* col 1 */}
                        <div className={clsx("basis-1/4 pl-2 border-1 border-slate-400 rounded-md",
                                            {"bg-slate-200": ( i & 1 ), "bg-sky-250": !( i & 1 )})}>
                            <p className="font-bold">WHO</p>{
                            record.who.map((whoIndex: number, n: number) => {
                                const name = whoList.map((row: {index: number; name: string;}) => {
                                    if (row.index === whoIndex) {
                                        if (n + 1 === record.who.length) {
                                            return row.name;
                                        }
                                        return row.name + ', ';
                                    };
                                });
                                return name;
                            })
                        }
                        </div>
                        {/* col 2 */}
                        <div className={clsx("basis-1/4 pl-2 border-1 border-slate-400 rounded-md",
                                            {"bg-slate-250": ( i & 1 ), "bg-sky-300": !( i & 1 )})}>
                            <p className="font-bold">WHEN</p>
                            <div>{record.when.date}</div>
                            <div>{record.when.time}</div>
                        </div>
                        {/* col 3 */}
                        
                        {/* COMMENTED OUT SUSPENSE; IT'S ONLY FOR DEMO 
                            The simulate delay is in app/lib/database.ts, the getDbData() function 
                        <Suspense fallback={<SixAnswersSkeleton />}>
                            <GetWhereData record={record} i={i} /> This component is below, 
                                                                   at the end of this file
                        </Suspense> */}
                        
                        <div className={clsx("basis-1/2 pl-2 border-1 border-slate-400 rounded-md",
                                            {"bg-slate-200": ( i & 1 ), "bg-sky-250": !( i & 1 )})}>
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
                    {/* BOTTOM ROW GROUP*/}
                    <div className="flex-col">
                        {([{label: 'WHAT'},
                        {label: 'HOW'},
                        {label: 'WHY'}])
                            .map((vars, j) => {
                                let data;
                                (j === 0) ? data = record.what : 
                                (j === 1) ? data = record.how : 
                                (j === 2) ? data = record.why : data = null;
                                return (
                                    <div key={j} className={clsx("flex flex-col rounded-md mt-px border-1 border-slate-400 pl-2", 
                                        {"even:bg-slate-250 odd:bg-slate-300": ( i & 1 ),
                                        "even:bg-sky-250 odd:bg-sky-300": !( i & 1 )})}>
                                        <p className="font-bold">{vars.label}</p>
                                        <p className="break-all">{data}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>);
            })
        }
        </>
    );
    
}

// The following is not currently used; it is used for the Suspense demo
export async function GetWhereData({record, i} : {record: any, i: number}) {

    const whereDefs: any = (await getDbData(`SELECT * FROM wheres WHERE id = ${record.where};`)).details.rows;

    const placeDetailsFunc = (recordWhereId: number, shallowEl: string, detailEl: string | null) => {
        const place = whereDefs.find((whereDef: {id: number}) => (whereDef.id === recordWhereId));
        if (detailEl !== null) {
            return place[shallowEl][detailEl];
        }
        return place[shallowEl];
    }

    return (
        <div className={clsx("basis-1/2 pl-2 border-1 border-slate-400 rounded-md",
                            {"bg-slate-200": ( i & 1 ), "bg-sky-250": !( i & 1 )})}>
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
    );
}