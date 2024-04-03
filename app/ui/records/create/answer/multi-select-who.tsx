import { SelectOptions } from '@/app/lib/interfaces';
import { SelectProps } from '@/app/lib/interfaces';

export default function MultiSelectWho(
    {options} : {options: [
        SelectProps,
        SelectOptions,
        number[] | null
    ]}
) {

    return (
        <div className="h-[120px] overflow-auto">
            {Object.entries(options[1]).map((el, i) => {
                return (
                    <div className="flex flex-row border-1 rounded-md">
                        <input type="checkbox" name="who" value={el[0]} />
                        <p className="pl-2" key={i}>{el[1]}</p>
                    </div>
                )
            })}
        </div>
    );
}