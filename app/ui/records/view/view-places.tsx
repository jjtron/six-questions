'use server';
import { Button } from '@/app/ui/button1';
import { fetchFilteredPlaces } from '@/app/lib/database';

export default async function Form({ query, currentPage } : { query: string, currentPage: number }) {

    const records = await fetchFilteredPlaces(query, currentPage);

    return (
        <form className="flex flex-col md:pl-2 bg-inherit">
            
            <div className="table w-full">
                <div className="table-header-group">
                    <div className="table-row">
                        <div className="table-cell pl-2 text-left font-bold border-tbl-1 border-slate-400 rounded-l-md bg-sky-250">Place Name</div>
                        <div className="table-cell text-left font-bold border-y-1 border-slate-400 bg-sky-250">Street</div>
                        <div className="table-cell text-left font-bold border-y-1 border-slate-400 bg-sky-250">City</div>
                        <div className="table-cell text-left font-bold border-trb-1 border-slate-400 rounded-r-md bg-sky-250">State</div>
                    </div>
                </div>
                { records.map((record, i) => {
                return (
                    <div key={i} className="table-row-group">
                    <div className="table-row border-1 border-white-300">
                        <div className="table-cell pl-2 border-tbl-1 border-slate-400 rounded-l-md bg-sky-300">{record.name}</div>
                        <div className="table-cell border-y-1 border-slate-400 bg-sky-300">{record.details.street}</div>
                        <div className="table-cell border-y-1 border-slate-400 bg-sky-300">{record.details.city}</div>
                        <div className="table-cell border-trb-1 border-slate-400 rounded-r-md bg-sky-300">{record.details.state}</div>
                    </div>
                    <input  id="id" name="id" type="hidden" value={record.id} />
                </div>)
                })}
            </div>

            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <Button type="submit">Edit Place</Button>
            </div>
                                       
        </form>
    );      
}