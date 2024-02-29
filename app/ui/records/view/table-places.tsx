"use client"

import { Button } from '@/app/ui/button';
import { useState } from 'react';
import clsx from 'clsx';

export function PlacesTable({records} : {records : any} ) {

    const [buttonDisabled, setButtonDisabled] = useState("disabled-link");
    const [rowIndex, setRowIndex] = useState(-1);
    const [selectedRecordId, setSelectedRecordId] = useState(-1);

    function handleClick(i: number, selectedRecordId: number) {
        setRowIndex(i);
        setSelectedRecordId(selectedRecordId);
        setButtonDisabled("");
    }

    return (
        <form className="flex flex-col md:pl-2 bg-inherit">
            <div className="table w-full">
                <div className="table-header-group">
                    <div className="table-row bg-sky-400">
                        <div className="table-cell pl-2 text-left font-bold border-tbl-1 border-slate-400 rounded-l-md">Place Name</div>
                        <div className="table-cell text-left font-bold border-y-1 border-slate-400">Street</div>
                        <div className="table-cell text-left font-bold border-y-1 border-slate-400">City</div>
                        <div className="table-cell text-left font-bold border-trb-1 border-slate-400 rounded-r-md">State</div>
                    </div>
                </div>
                { records.map((record: any, i: number) => {
                return (
                    <div key={i} className="table-row-group">
                        <div className={clsx("table-row",
                                            {"bg-sky-300" : i === rowIndex,
                                             "bg-sky-200" : i !== rowIndex
                                            })
                                       }
                                       onClick={() => handleClick(i, record.id)} >
                            <div className="table-cell pl-2 border-tbl-1 border-slate-400 rounded-l-md">{record.name}</div>
                            <div className="table-cell border-y-1 border-slate-400">{record.details.street}</div>
                            <div className="table-cell border-y-1 border-slate-400">{record.details.city}</div>
                            <div className="table-cell border-trb-1 border-slate-400 rounded-r-md">{record.details.state}</div>
                        </div>
                    </div>)
                })}
            </div>
            <div className="flex flex-col items-center justify-between p-4">
                <Button isDisabled={buttonDisabled}
                        cName={"w-24"}
                        showdatalink={`/records/${selectedRecordId}/edit/places`}
                        buttontext={"Edit"} >
                </Button>
            </div>
        </form>
    );      
}