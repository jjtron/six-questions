"use client"

import { Button } from '@/app/ui/button';
import { useState } from 'react';
import clsx from 'clsx';

export function PlacesTable({records} : {records : any} ) {

  const [buttonDisabled, setButtonDisabled] = useState("disabled-link");
  const [rowIndex, setRowIndex] = useState('-1');
  const [selectedRecordId, setSelectedRecordId] = useState(-1);

  function handleClick(selectedRecordId: string, recordid: number) {
      setRowIndex(selectedRecordId);
      setSelectedRecordId(recordid);
      setButtonDisabled("");
  }

  return (
    <form className="md:pl-2 bg-inherit">
        
      { records.map((group: any, i: number) => {

            return (
              group.map((record: any, j: number) => {
                const lineId: string = (i + '') + (j + '');
                return (
                  <div key={lineId} className="w-full flex flex-col">
                    <p className={clsx("pl-2", {"hidden" : (j !== 0)})}>{record.type}</p>
                    <div className={clsx("flex flex-row bg-sky-400 rounded-md", {"hidden" : (j !== 0 || record.type !== "country")})}>
                      <div className="basis-1/2 pl-2 text-left font-bold border-tbl-1 border-slate-400 rounded-l-md">Country</div>
                      <div className="basis-1/2 text-left font-bold border-trb-1 border-slate-400 rounded-r-md"></div>
                    </div>
                    <div className={clsx("flex flex-row bg-sky-400 rounded-md", {"hidden" : (j !== 0 || record.type !== "name_street_city_state")})}>
                      <div className="basis-1/4 pl-2 text-left font-bold border-tbl-1 border-slate-400 rounded-l-md">Place Name</div>
                      <div className="basis-1/4 text-left font-bold border-y-1 border-slate-400">Street</div>
                      <div className="basis-1/4 text-left font-bold border-y-1 border-slate-400">City</div>
                      <div className="basis-1/4 text-left font-bold border-trb-1 border-slate-400 rounded-r-md">State</div>
                    </div>
                    <div className={clsx("flex flex-row rounded-md", { "bg-sky-300" : (lineId) === rowIndex, "bg-sky-200" : (lineId) !== rowIndex })}
                        onClick={() => handleClick(lineId, record.id)} >
                      <div className="basis-1/4 pl-2 border-tbl-1 border-slate-400 rounded-l-md">{record.name}</div>
                      <div className="basis-1/4 border-y-1 border-slate-400">{record.details.street}</div>
                      <div className="basis-1/4 border-y-1 border-slate-400">{record.details.city}</div>
                      <div className="basis-1/4 border-trb-1 border-slate-400 rounded-r-md">{record.details.state}</div>
                    </div>
                  </div>
                )
              })
            )
        })
      }
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