"use server"
import { getRecords } from "@/app/lib/actions";
import { Button } from "@/app/ui/button"

export default async function Page() {
    const answer_route: string = "/records/create/answer";
    const place_route: string = "/records/create/place";
    const records: any = await getRecords();
 
    return (
        <>
        {records?.map((record: Array<any>, i: any) => (
            <div key={i} className="flex m-10">
                <div className="flex-1 bg-teal-400">Id</div>
                <div className="flex-1 bg-teal-400">Who</div>
                <div className="flex-1 bg-teal-400">what</div>
                <div className="flex-1 bg-teal-400">where</div>
                <div className="flex-1 bg-teal-400">when</div>
                <div className="flex-1 bg-teal-400">why</div>
                <div className="flex-1 bg-teal-400">how</div>
            </div>
        ))}
        {records?.map((record: Array<any>, i: any) => (
                <div key={i} className="flex m-10">
                    <div className="flex-1 bg-teal-400">{record[0]}</div>
                    <div className="flex-1 bg-teal-400">{record[1]}</div>
                    <div className="flex-1 bg-teal-400">{record[2]}</div>
                    <div className="flex-1 bg-teal-400">{record[3]}</div>
                    <div className="flex-1 bg-teal-400">{record[4]}</div>
                    <div className="flex-1 bg-teal-400">{record[5]}</div>
                    <div className="flex-1 bg-teal-400">{record[6]}</div>
                </div>
        ))}
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <Button className="mt-4 w-full" buttontext={'Create Six Questions Record'} showdatalink={answer_route}></Button>
            <Button className="mt-4 w-full" buttontext={'Create a Person (Who)'} showdatalink={answer_route}></Button>
            <Button className="mt-4 w-full" buttontext={'Create a Date/Time (When)'} showdatalink={answer_route}></Button>
            <Button className="mt-4 w-full" buttontext={'Create a Place (Where)'} showdatalink={place_route}></Button>
        </div>
        </>
    );
}