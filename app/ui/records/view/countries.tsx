import clsx from 'clsx';

export function Countries (props: any) {
   
    return ( <>
        { props.group.map((record: any, i: number) => {
            return (
              <div  key={i} 
                    className={
                      clsx("pl-2 basis-1/3 border-trb-1 border-slate-400",
                          { "bg-sky-300" : props.lineId === props.rowIndex},
                          { "bg-sky-200" : props.lineId !== props.rowIndex },
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