"use server"
import { getDbData } from "@/app/lib/database";
import { Button } from "@/app/ui/button";
import clsx from 'clsx';

export default async function Page() {
    const answer_route: string = "/records/create/answer";
    const place_route: string = "/records/create/place";
    const records: any = (await getDbData(` SELECT * FROM six_questions; `)).details.rows;
    const whoList: any = (await getDbData(`SELECT * FROM whos;`)).details.rows;
    const whereDefs: any = (await getDbData(`SELECT * FROM wheres;`)).details.rows;

    const placeDetailsFunc = (recordWhereId: number, shallowEl: string, detailEl: string | null) => {
        const place = whereDefs.find((whereDef: {id: number}) => (whereDef.id === recordWhereId));
        if (detailEl !== null) {
            return place[shallowEl][detailEl];
        }
        return place[shallowEl];
    }
    
    return (
        <>
        <div>&nbsp;</div>
        <div className="mx-6">
        {records.map((record: 
            {
                id: string[]; who: Array<any>; what: string[];
                where: number; when: {date: string[]; time: string[]}; why: string[];
                how: string[];
            }, i: any) => {
                return <div key={i} className="flex-row">
                    {/* TOP ROW GROUP*/}
                    <div className="flex mx-0 border-rtl-1 border-black even:bg-slate-100 odd:bg-slate-300">
                        {/* col 1 */}
                        <div className="flex-none w-44 bg-slate-200 pl-2">
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
                        }</div>
                        {/* col 2 */}
                        <div className="flex-row flex-1 bg-slate-300 pl-2">
                        {
                            ([
                                {title: "WHERE", level: 'name', sublevel: null},
                                {title: "Street: ", level: 'details', sublevel: 'street'},
                                {title: "City: ", level: 'details', sublevel: 'city'},
                                {title: "State: ", level: 'details', sublevel: 'state'}
                            ]).map((el: any, i: number) => {
                             return <div key={i} className="flex flex-1">
                                        <div className={clsx("basis-1/5 mr-2", { "font-bold": i === 0, "text-right": i > 0 })}>{el.title}</div>
                                        <div className={clsx("basis-5/5", { "font-medium": i === 0})}> {placeDetailsFunc(record.where, el.level, el.sublevel)}</div>
                                        
                                    </div>
                                    
                            })
                        }</div>
                        {/* col 3 */}
                        <div className="flex-1 bg-slate-200 pl-2">
                            <p className="font-bold">WHEN</p>
                            <div>{record.when.date}</div>
                            <div>{record.when.time}</div>
                        </div>
                    </div>
                    {/* BOTTOM ROW GROUP*/}
                    <div className="flex-row flex-1 border-rtl-1 border-black">
                        {/* SECTION WHAT*/}<p className="font-bold pl-2">WHAT</p>
                        <div className="flex-1 border-b-1 border-black pl-2">{record.what}</div>
                        {/* SECTION WHY*/}<p className="font-bold pl-2">WHY</p>
                        <div className="flex-1 border-b-1 border-black pl-2">{record.why}</div>
                        {/* SECTION WHEN*/}<p className="font-bold pl-2">WHEN</p>
                        <div className="flex-1 border-b-1 border-black pl-2">{record.how}</div>
                    </div>
                    <div className="bg-inherit">&nbsp;</div>
                </div>
                })}
        </div>
        
        <div className="flex min-h-screen flex-row justify-between p-24 space-x-2">
            <Button className="mt-4 w-full" buttontext={'Create Six Questions Record'} showdatalink={answer_route}></Button>
            <Button className="mt-4 w-full" buttontext={'Create a Person (Who)'} showdatalink={answer_route}></Button>
            <Button className="mt-4 w-full" buttontext={'Create a Date/Time (When)'} showdatalink={answer_route}></Button>
            <Button className="mt-4 w-full" buttontext={'Create a Place (Where)'} showdatalink={place_route}></Button>
        </div>
        </>
    );
    
}