"use client"

import { Button } from '@/app/ui/button';
import { useState } from 'react';
import clsx from 'clsx';
import { Countries } from './countries';
import { Place } from '@/app/lib/interfaces';

export function PlacesTable({placesGroups} : {placesGroups : Place[][]} ) {

  const [buttonDisabled, setButtonDisabled] = useState("disabled-link");
  const [selectedRecordId, setSelectedRecordId] = useState(-1);

  function handleClick(recordid: number) {
      setSelectedRecordId(recordid);
      setButtonDisabled("");
  }

  return (
    <form className="md:pl-2 bg-inherit">
        
      { placesGroups.map((group: Place[], i: number) => {
            return (
              group.map((record: Place, j: number) => {
                const lineId: string = (i + '') + (j + '');
                return (
                  <div key={lineId} className="w-full flex flex-col">
                    {/* Street, City, State header */}
                    <div className={clsx("flex flex-row bg-sky-400 rounded-md", {"hidden" : (j !== 0 || record.type !== "street_city_state")})}>
                      <div className="basis-1/4 pl-2 text-left font-bold border-tbl-1 border-slate-400 rounded-l-md">Place Name</div>
                      <div className="basis-1/4 text-left font-bold border-y-1 border-slate-400">Street</div>
                      <div className="basis-1/4 text-left font-bold border-y-1 border-slate-400">City</div>
                      <div className="basis-1/4 text-left font-bold border-trb-1 border-slate-400 rounded-r-md">State</div>
                    </div>
                    {/* Street, City, State records */}
                    <div className={clsx("flex flex-row rounded-md",
                            { "bg-yellow-100" : selectedRecordId === record.id, "bg-sky-200" : selectedRecordId !== record.id },
                            { "hidden" : (record.type !== "street_city_state")}
                          )}
                        onClick={() => handleClick(record.id)} >
                      <div className="basis-1/4 pl-2 border-tbl-1 border-slate-400 rounded-l-md">{record.name}</div>
                      <div className="basis-1/4 border-y-1 border-slate-400">{record.details.street}</div>
                      <div className="basis-1/4 border-y-1 border-slate-400">{record.details.city}</div>
                      <div className="basis-1/4 border-trb-1 border-slate-400 rounded-r-md">{record.details.state}</div>
                    </div>

                    {/* Countries header */}
                    <div className={clsx("flex flex-row bg-sky-400 rounded-md", {"hidden" : (j !== 0 || record.type !== "country")})}>
                      <div className="basis-full pl-2 text-left font-bold border-tbl-1 border-slate-400 rounded-md">Countries</div>
                    </div>
                    {/* Countries records */}
                    <div  className={clsx("flex flex-row flex-wrap",
                                        { "hidden" : (record.type !== "country" || j !== 0)}
                                    )}>
                            <Countries group={group} selectedRecordId={selectedRecordId} countryClick={handleClick}/>
                    </div>

                    {/* Countries and cities header */}
                    <div className={clsx("flex flex-row bg-sky-400 rounded-md", {"hidden" : (j !== 0 || record.type !== "country_city")})}>
                      <div className="basis-full pl-2 text-left font-bold border-tbl-1 border-slate-400 rounded-md">Cities, Countries</div>
                    </div>
                    {/* Countries and cities records */}
                    <div  className={clsx("flex flex-row flex-wrap",
                                        { "hidden" : (record.type !== "country_city" || j !== 0)}
                                    )}>
                            <Countries group={group} selectedRecordId={selectedRecordId} countryClick={handleClick}/>
                    </div>

                    {/* Country with Description header */}
                    <div className={clsx("flex flex-row bg-sky-400 rounded-md", {"hidden" : (j !== 0 || record.type !== "country_and_desc")})}>
                      <div className="basis-full pl-2 text-left font-bold border-tbl-1 border-slate-400 rounded-md">Country with Description</div>
                    </div>
                    {/* Country with Description records */}
                    <div  className={clsx("flex flex-row rounded-md",
                                      { "bg-yellow-100" : selectedRecordId === record.id, "bg-sky-200" : selectedRecordId !== record.id },
                                      { "hidden" : (record.type !== "country_and_desc")}
                                    )}
                          onClick={() => handleClick(record.id)}
                    >
                      <div className="basis-1/4 px-2 border-tbl-1 border-slate-400 rounded-l-md">{record.name}</div>
                      <textarea
                          rows={4}
                          value={record.details.desc}
                          readOnly
                          className="basis-3/4 rounded-r-md border-trb-1 border-slate-400 outline-none pl-2"
                      />
                    </div>

                    {/* Country and City with Description header */}
                    <div className={clsx("flex flex-row bg-sky-400 rounded-md", {"hidden" : (j !== 0 || record.type !== "country_city_and_desc")})}>
                      <div className="basis-full pl-2 text-left font-bold border-tbl-1 border-slate-400 rounded-md">Country and City with Description</div>
                    </div>
                    {/* Country and City with Description records */}
                    <div  className={clsx("flex flex-row rounded-md",
                                      { "bg-yellow-100" : selectedRecordId === record.id, "bg-sky-200" : selectedRecordId !== record.id },
                                      { "hidden" : (record.type !== "country_city_and_desc")}
                                    )}
                          onClick={() => handleClick(record.id)}
                    >
                      <div className="basis-1/4 pl-2 border-tbl-1 border-slate-400 rounded-l-md">{record.details.city}, {record.name}</div>
                      <textarea
                          rows={4}
                          value={record.details.desc}
                          readOnly
                          className="basis-3/4 rounded-r-md border-trb-1 border-slate-400 outline-none pl-2"
                      />
                    </div>

                    {/* General Description header */}
                    <div className={clsx("flex flex-row bg-sky-400 rounded-md", {"hidden" : (j !== 0 || record.type !== "any")})}>
                      <div className="basis-full pl-2 text-left font-bold border-tbl-1 border-slate-400 rounded-md">General Description</div>
                    </div>
                    {/* General Description records */}
                    <div  className={clsx("flex flex-row rounded-md",
                                      { "bg-yellow-100" : selectedRecordId === record.id, "bg-sky-200" : selectedRecordId !== record.id },
                                      { "hidden" : (record.type !== "any")}
                                    )}
                          onClick={() => handleClick(record.id)}
                    >
                      <div className="basis-1/4 pl-2 border-tbl-1 border-slate-400 rounded-l-md">{record.name}</div>
                      <textarea
                          rows={4}
                          value={record.details.desc}
                          readOnly
                          className="basis-3/4 rounded-r-md border-trb-1 border-slate-400 outline-none pl-2"
                      />
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