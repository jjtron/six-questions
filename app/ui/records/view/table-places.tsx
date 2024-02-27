"use client"

import { Button } from '@/app/ui/button';
import { useState } from 'react';
import clsx from 'clsx';

export function PlacesTable({records} : {records : any} ) {

    let dynamicClassBase: any = [];
    for (let i = 0; i < records.length; i++) {
        dynamicClassBase.push("bg-sky-300");
    }
    const [dynamicClass, setDynamicClass] = useState(dynamicClassBase);
    const [buttonDisabled, setButtonDisabled] = useState("disabled-link");
    const [recordid, setRecordId] = useState(0);

    function handleClick(i: number, selectedRecordId: number) {
        let dynamicClassFresh = dynamicClassBase.splice(0);
        dynamicClassFresh.splice(i, 1, "bg-sky-600");
        setRecordId(selectedRecordId);
        setButtonDisabled("");
        setDynamicClass(dynamicClassFresh);
        console.log(selectedRecordId);
    }

    return (
        <form className="flex flex-col md:pl-2 bg-inherit">
            <div className="table w-full">
                <div className="table-header-group">
                    <div className="table-row bg-sky-250">
                        <div className="table-cell pl-2 text-left font-bold border-tbl-1 border-slate-400 rounded-l-md">Place Name</div>
                        <div className="table-cell text-left font-bold border-y-1 border-slate-400">Street</div>
                        <div className="table-cell text-left font-bold border-y-1 border-slate-400">City</div>
                        <div className="table-cell text-left font-bold border-trb-1 border-slate-400 rounded-r-md">State</div>
                    </div>
                </div>
                { records.map((record: any, i: number) => {
                return (
                    <div key={i} className="table-row-group">
                        <div className={clsx(`table-row ${dynamicClass[i]}`)} onClick={() => handleClick(i, record.id)} >
                            <div className="table-cell pl-2 border-tbl-1 border-slate-400 rounded-l-md">{record.name}</div>
                            <div className="table-cell border-y-1 border-slate-400">{record.details.street}</div>
                            <div className="table-cell border-y-1 border-slate-400">{record.details.city}</div>
                            <div className="table-cell border-trb-1 border-slate-400 rounded-r-md">{record.details.state}</div>
                        </div>
                    </div>)
                })}
            </div>
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <Button isDisabled={buttonDisabled}
                        cName={"w-24"}
                        showdatalink={`/records/${recordid}/edit/places`}
                        buttontext={"Edit"} >
                </Button>
            </div>
        </form>
    );      
}