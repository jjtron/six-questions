"use server"
import { getRecords } from "@/app/lib/actions";

export default async function Page() {
    
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
        </>
    );
}