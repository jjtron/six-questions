import { SelectProps, RadioOptions } from '@/app/lib/interfaces';

export default function WhereRadio(
    {whereOptions} : {whereOptions: [
        SelectProps,
        RadioOptions
    ]}
    ) {
    return (
        <div className="flex flex-col space-y-1 pb-2" >
            { whereOptions[1].list.map((el, i) => {
                return (
                    <div key={i} className="flex flex-row border-1 border-slate-400 rounded-md px-2">
                        <input type="radio" name="where" value={el.id} />
                        <div className="flex flex-col">
                            <div>{el.name}</div>
                            <div>{el.details.street}</div>
                            <div>{el.details.city}</div>
                        </div>
                    </div>
                )
                })
            }
        </div>
    );
}