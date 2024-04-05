"use client"

import { Button } from '@/app/ui/button';
import { useState } from 'react';
import clsx from 'clsx';
import { Countries } from './countries';
import { EventTime } from '@/app/lib/interfaces';

export function EventTimesTable({eventTimesGroups} : {eventTimesGroups : EventTime[][]} ) {

  const [buttonDisabled, setButtonDisabled] = useState("disabled-link");
  const [selectedRecordId, setSelectedRecordId] = useState(-1);

  function handleClick(recordid: number) {
      setSelectedRecordId(recordid);
      setButtonDisabled("");
  }

  return (
    <form className="md:pl-2 bg-inherit">
        
      { eventTimesGroups.map((group: any, i: number) => {
            return (
              group.map((record: EventTime, j: number) => {
                const lineId: string = (i + '') + (j + '');
                return (
                  <div key={lineId} className="w-full flex flex-col">
                    {/* CIRCA YEAR ONLY header */}
                    <div className={clsx(`bg-sky-400 rounded-md pl-2 text-left
                                          font-bold border-tbl-1 border-slate-400
                                          rounded-l-md`,
                                          { "hidden" : (j !== 0 || record.type !== "circa_yr" )}
                                        )
                                   }
                    >CIRCA, YEAR ONLY</div>

                    {/* CIRCA records */}
                    <div className={clsx("flex flex-row rounded-md",
                            { "bg-yellow-100" : selectedRecordId === record.id, "bg-sky-200" : selectedRecordId !== record.id },
                            { "hidden" : (record.type !== "circa_yr")}
                          )}
                        onClick={() => handleClick(record.id)} >
                      <div className="basis-1/6 pl-2 border-tbl-1 border-slate-400 rounded-l-md"><span className="pl-2">{record.name}</span></div>
                      <div className="basis-5/6 pl-2 border-1 border-slate-400 rounded-r-md bg-white">{record.comments}</div>
                    </div>

                    {/* //////////////////////////////////////////////////////////////////////////// */}
                    {/* CIRCA YEAR RANGE header */}
                    <div className={clsx(`bg-sky-400 rounded-md pl-2 text-left
                                          font-bold border-tbl-1 border-slate-400
                                          rounded-l-md`,
                                          { "hidden" : (j !== 0 || record.type !== "circa_range" )}
                                        )
                                   }
                    >CIRCA, YEAR RANGE</div>

                    {/* CIRCA records */}
                    <div className={clsx("flex flex-row rounded-md",
                            { "bg-yellow-100" : selectedRecordId === record.id, "bg-sky-200" : selectedRecordId !== record.id },
                            { "hidden" : (record.type !== "circa_range")}
                          )}
                        onClick={() => handleClick(record.id)} >
                      <div className="basis-1/3 pl-2 border-1 border-slate-400 rounded-l-md"><span className="pl-2">{record.name}</span></div>
                      <div className="basis-2/3 pl-2 border-trb-1 border-slate-400 rounded-r-md bg-white">{record.comments}</div>
                    </div>

                    {/* //////////////////////////////////////////////////////////////////////////// */}

                    {/* GENERAL header */}
                    <div className={clsx(`bg-sky-400 rounded-md pl-2 text-left
                                          font-bold border-tbl-1 border-slate-400
                                          rounded-l-md`,
                                          { "hidden" : (j !== 0 || record.type !== "general" )}
                                        )
                                   }
                    >GENERAL</div>

                    {/* GENERAL records */}
                    <div className={clsx("flex flex-row rounded-md",
                            { "bg-yellow-100" : selectedRecordId === record.id, "bg-sky-200" : selectedRecordId !== record.id },
                            { "hidden" : (record.type !== "general")}
                          )}
                        onClick={() => handleClick(record.id)} >
                      <div className="basis-2/5 pl-2 border-1 border-slate-400 rounded-l-md"><span>{record.name}</span></div>
                      <div className="basis-3/5 pl-2 border-1 border-slate-400 rounded-r-md bg-white">{record.comments}</div>
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
                  showdatalink={`/records/${selectedRecordId}/edit/event-times`}
                  buttontext={"Edit"} >
          </Button>
      </div>
    </form>
  );      
}