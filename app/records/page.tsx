"use server"
import { getDbData } from "@/app/lib/database";
import { Button } from "@/app/ui/button"

export default async function Page() {
    const answer_route: string = "/records/create/answer";
    const place_route: string = "/records/create/place";
    const records: any = await getDbData(`
        SELECT * FROM six_questions;
    `);
    
    return (
        <>
        <div className="flex m-10">
            <div className="flex-1 bg-teal-400">Who</div>
            <div className="flex-1 bg-teal-400">What</div>
            <div className="flex-1 bg-teal-400">Where</div>
            <div className="flex-1 bg-teal-400">When</div>
            <div className="flex-1 bg-teal-400">Why</div>
            <div className="flex-1 bg-teal-400">How</div>
        </div>

        {records.details.rows?.map((record: 
            {
                id: string[]; who: Array<any>; what: string[];
                where: number; when: {date: string[]; time: string[]}; why: string[];
                how: string[];
            }, i: any) => (
                <div key={i} className="flex m-10 my-0 border-y-2 border-y-black border-t-0">
                    <div className="flex-1 bg-slate-100">{record.who[0]}, {record.who[1]}</div>
                    <div className="flex-1 bg-slate-100">{record.what}</div>
                    <div className="flex-1 bg-slate-100">{record.where}</div>
                    <div className="flex-1 bg-slate-100">
                        <div>{record.when.date}</div>
                        <div>{record.when.time}</div>
                    </div>
                    <div className="flex-1 bg-slate-100">{record.why}</div>
                    <div className="flex-1 bg-slate-100">{record.how}</div>
                </div>
        ))}
        
        <div className="flex min-h-screen flex-row justify-between p-24">
            <Button className="mt-4 w-full" buttontext={'Create Six Questions Record'} showdatalink={answer_route}></Button>
            <Button className="mt-4 w-full" buttontext={'Create a Person (Who)'} showdatalink={answer_route}></Button>
            <Button className="mt-4 w-full" buttontext={'Create a Date/Time (When)'} showdatalink={answer_route}></Button>
            <Button className="mt-4 w-full" buttontext={'Create a Place (Where)'} showdatalink={place_route}></Button>
        </div>
        </>
    );
}