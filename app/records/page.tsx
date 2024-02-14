"use server"
import { getDbData } from "@/app/lib/database";
import { Button } from "@/app/ui/button";
import { revalidatePath } from 'next/cache';

export default async function Page() {
    const answer_route: string = "/records/create/answer";
    const place_route: string = "/records/create/place";
    const records: any = (await getDbData(` SELECT * FROM six_questions; `)).details.rows;
    const whoList: any = (await getDbData(`SELECT * FROM whos;`)).details.rows;
    
    return (
        <>
        <div className="flex mx-10 my-2 border-1 border-black">
            <div className="flex-1 bg-teal-400">Who</div>
            <div className="flex-1 bg-teal-400">What</div>
            <div className="flex-1 bg-teal-400">Where</div>
            <div className="flex-1 bg-teal-400">When</div>
            <div className="flex-1 bg-teal-400">Why</div>
            <div className="flex-1 bg-teal-400">How</div>
        </div>

        <div className="border-rbl-1 border-black mx-10">
        {records.map((record: 
            {
                id: string[]; who: Array<any>; what: string[];
                where: number; when: {date: string[]; time: string[]}; why: string[];
                how: string[];
            }, i: any) => (
                <div key={i} className="flex mx-0 border-t-1 border-black even:bg-slate-100 odd:bg-slate-300">
                    <div className="flex-1">{
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
                    <div className="flex-1">{record.what}</div>
                    <div className="flex-1">{record.where}</div>
                    <div className="flex-1">
                        <div>{record.when.date}</div>
                        <div>{record.when.time}</div>
                    </div>
                    <div className="flex-1">{record.why}</div>
                    <div className="flex-1">{record.how}</div>
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