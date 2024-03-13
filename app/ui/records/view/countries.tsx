import clsx from 'clsx';
import { Place } from '@/app/lib/interfaces';

export function Countries (props: {group: any; selectedRecordId: number; countryClick: Function} ) {

    return ( <>
        { props.group.map((record: Place, i: number) => {
            return (
              <div  key={i} onClick={() => props.countryClick(record.id)}
                    className={
                      clsx("pl-2 basis-1/3 border-trb-1 border-slate-400",
                          { "bg-yellow-100" : props.selectedRecordId === record.id },
                          { "bg-sky-200" : props.selectedRecordId !== record.id },
                          { "rounded-l-md": ( i % 3 === 0 ) && props.group.length - i > 1 },
                          { "rounded-r-md": ( i % 3 === 1 ) && props.group.length - i === 1 },
                          { "rounded-r-md": ( i % 3 === 2 ) && props.group.length - i >= 1 },
                          { "rounded-md": ( i % 3 === 0 ) && props.group.length - i === 1 }
                      )}>
                    {record.name} { props.group.length - i }
                    
              </div>
            )
        })
        }
    </>)
}