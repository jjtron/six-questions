"use server"
import { getDbData } from "@/app/lib/database";
import { Button } from "@/app/ui/button";
import { revalidatePath } from 'next/cache';

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
        <div className="flex mx-10 my-2 border-1 border-black">
            <div className="flex-none w-44 h-14 ...">Who</div>
            <div className="flex-1">Where</div>
            <div className="flex-1">When</div>
        </div>

        <div className="border-rbl-1 border-black mx-10">
        {records.map((record: 
            {
                id: string[]; who: Array<any>; what: string[];
                where: number; when: {date: string[]; time: string[]}; why: string[];
                how: string[];
            }, i: any) => (
                <div key={i} className="flex-row">
                    {/* TOP ROW GROUP*/}
                    <div className="flex mx-0 border-t-1 border-black even:bg-slate-100 odd:bg-slate-300">
                        {/* col 1 */}
                        <div className="flex-none w-44 h-14 ...">{
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
                        <div className="flex-row flex-1">
                            {([
                                {title: "Title:", level: 'name', sublevel: null},
                                {title: "Street:", level: 'details', sublevel: 'street'},
                                {title: "City:", level: 'details', sublevel: 'city'},
                                {title: "State:", level: 'details', sublevel: 'state'}
                            ]).map((el: any, i: number) => (
                                    <div key={i} className="flex flex-1">
                                        <div className="basis-1/5">{el.title}</div>
                                        <div className="basis-5/6">{placeDetailsFunc(record.where, el.level, el.sublevel)}</div> 
                                    </div>
                            ))}
                        </div>
                        {/* col 3 */}
                        <div className="flex-1">
                            <div>{record.when.date}</div>
                            <div>{record.when.time}</div>
                        </div>
                    </div>
                    {/* BOTTOM ROW GROUP*/}
                    <div className="flex-row flex-1">
                        {/* SECTION WHAT*/}
                        <div className="flex-1">{record.what}</div>
                        {/* SECTION WHY*/}
                        <div className="flex-1">{record.why}</div>
                        {/* SECTION WHEN*/}
                        <div className="flex-1">{record.how}</div>
                    </div>
                </div>
                ))}
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