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
                return (<>xxx</>)
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