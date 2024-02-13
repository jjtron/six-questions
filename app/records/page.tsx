"use server"
import { getRecords } from "@/app/lib/actions";
import { Button } from "@/app/ui/button"

export default async function Page() {
    const answer_route: string = "/records/create/answer";
    const place_route: string = "/records/create/place";
    const records: any = await getRecords();
 
    return (
        <>
        <table>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Who</th>
                    <th>what</th>
                    <th>where</th>
                    <th>when</th>
                    <th>why</th>
                    <th>how</th>
                </tr>
                {records?.map((record: Array<any>, i: any) => (
                <tr key={i} >
                    <td>{record[0]}</td>
                    <td>{record[1]}</td>
                    <td>{record[2]}</td>
                    <td>{record[3]}</td>
                    <td>{record[4]}</td>
                    <td>{record[5]}</td>
                    <td>{record[6]}</td>
                </tr>
                ))}
            </tbody>
        </table>
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <Button className="mt-4 w-full" buttontext={'Create Six Questions Record'} showdatalink={answer_route}></Button>
            <Button className="mt-4 w-full" buttontext={'Create a Person (Who)'} showdatalink={answer_route}></Button>
            <Button className="mt-4 w-full" buttontext={'Create a Date/Time (When)'} showdatalink={answer_route}></Button>
            <Button className="mt-4 w-full" buttontext={'Create a Place (Where)'} showdatalink={place_route}></Button>
        </div>
        </>
    );
}