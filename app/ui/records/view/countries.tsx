import clsx from 'clsx';

export function Countries (props: any) {

    return ( <>
        { props.group.map((record: any, i: number) => {
            return (
              <div  key={i} onClick={() => props.countryClick(props.lineId, record.id)}
                    className={
                      clsx("pl-2 basis-1/3 border-trb-1 border-slate-400",
                          { "bg-yellow-300" : props.selectedRecordId === record.id },
                          { "bg-sky-200" : props.selectedRecordId !== record.id },
                          { "rounded-l-md": (i % 3 === 0 )},
                          { "rounded-r-md": (i % 3 === 2 )}
                      )}>
                    {record.name}
                    
              </div>
            )
        })
        }
    </>)
}