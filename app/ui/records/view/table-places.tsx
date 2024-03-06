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

    //console.log(records);

    function showPlaceRecord (record: any, i: number) {
        return (
            <div className={clsx("table-row",
                                {"bg-sky-300" : i === rowIndex,
                                 "bg-sky-200" : i !== rowIndex
                                })
                           }
                           onClick={() => handleClick(i, record.id)} >
                <div className="table-cell pl-2 border-tbl-1 border-slate-400 rounded-l-md">{record.name}{i}</div>
                <div className="table-cell border-y-1 border-slate-400">{record.street}</div>
                <div className="table-cell border-y-1 border-slate-400">{record.city}</div>
                <div className="table-cell border-trb-1 border-slate-400 rounded-r-md">{record.state}</div>
            </div>
        )
    }

    return (
        <form className="md:pl-2 bg-inherit">
            <div className="table w-full">
                
                { 
                records.map((group: any) => {
                    return (
                    group.map((record: any, j: number) => {
                    
                    
                        if (j === 0) {
                            return (
                                <div key={j} className="table-header-group">
                                    <p className="pl-2 bg-gray-400 font-bold">{record.type}</p>
                                    <div className="table-row bg-sky-400">
                                        <div className="table-cell pl-2 text-left font-bold border-tbl-1 border-slate-400 rounded-l-md">Place Name</div>
                                        <div className="table-cell text-left font-bold border-y-1 border-slate-400">Street</div>
                                        <div className="table-cell text-left font-bold border-y-1 border-slate-400">City</div>
                                        <div className="table-cell text-left font-bold border-trb-1 border-slate-400 rounded-r-md">State</div>
                                    </div>
                                </div>
                            )
                        } else if (j > 0 && j < (records.length)) {
                            return (
                                <div key={j} className="table-row-group">
                                    {showPlaceRecord(records[j - 1], j)}
                                </div>
                            )
                        }
                        
                    }
                    
                    )
                    
                    )

                })
                }
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

//showPlaceRecord(records[records.length - 1], records.length)