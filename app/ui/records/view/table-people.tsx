"use client"

import { Button } from '@/app/ui/button';
import { useState } from 'react';
import clsx from 'clsx';
import { Person } from '@/app/lib/interfaces';

export function PeopleTable({records} : {records : Person[]} ) {

    const [buttonDisabled, setButtonDisabled] = useState("disabled-link");
    const [rowIndex, setRowIndex] = useState(-1);
    const [selectedRecordId, setSelectedRecordId] = useState(-1);

    function handleClick(i: number, selectedRecordId: number) {
        setRowIndex(i);
        setSelectedRecordId(selectedRecordId);
        setButtonDisabled("");
    }

    return (
        <form className="md:pl-2 bg-inherit">
            <div className="table w-full">
                <div className="flex flex-row bg-sky-400 rounded-md">
                    <div className="max-[320px]:basis-1/4 basis-1/5 text-left pl-2 text-left font-bold border-slate-400 max-[320px]:text-xs">Name</div>
                    <div className="max-[320px]:basis-3/4 basis-4/5 text-left pl-2 text-left font-bold border-slate-400 max-[320px]:text-xs">Description</div>
                </div>
                { records.map((record: any, i: number) => {
                    return (
                        <div key={i} className={clsx("flex flex-row rounded-md",
                                {"bg-yellow-100" : i === rowIndex,
                                    "bg-sky-200" : i !== rowIndex
                                })}
                            onClick={() => handleClick(i, record.index)}
                        >
                            <div className="max-[320px]:basis-1/4 basis-1/5 pl-2 border-tbl-1 border-slate-400 rounded-l-md max-[320px]:text-xs">{record.name}</div>
                            <div className="max-[320px]:basis-3/4 basis-4/5 pl-2 border-trb-1 border-slate-400 rounded-r-md bg-white max-[320px]:text-xs">{record.comments}</div>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col items-center justify-between p-4">
                <Button isDisabled={buttonDisabled}
                        cName={"w-24"}
                        showdatalink={`/records/${selectedRecordId}/edit/people`}
                        buttontext={"Edit"} >
                </Button>
            </div>
        </form>
    )
}