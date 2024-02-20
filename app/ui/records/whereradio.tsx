import { SelectProps, RadioOptions } from '@/app/lib/interfaces';

export default function WhereRadio(
    {whereOptions} : {whereOptions: [
        SelectProps,
        RadioOptions
    ]}
    ) {
    return (
        <div className="flex flex-row pb-2 h-flow place-content-center" >
            { whereOptions[1].list.map((el, i) => {
                return (
                    <div key={i} className="flex flex-row basis-5/12 shrink-0 border-1 border-slate-400 rounded-md px-2 mt-1 mr-1">
                        <input className="h-[24px]" type="radio" name="where" value={el.id} />
                        <div className="flex flex-col ml-2">
                            <div>{el.name}</div>
                            <div>{el.details.street}</div>
                            <div>{el.details.city}</div>
                            <div>{el.details.state}</div>
                        </div>
                    </div>
                )
                })
            }
        </div>
    );
}