"use server"
import { getRecords } from "@/app/lib/actions";
import { Button } from "@/app/ui/button"

export default async function Page() {
    const showdatalink: string = "/records/create";
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
            <Button className="mt-4 w-full" buttontext={'Create'} showdatalink={showdatalink}></Button>
        </div>
        </>
    );
}