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
        <div>
            {Object.entries(options[1]).map((el, i) => {
                return (
                    <div className="flex flex-row">
                        <input type="checkbox" name="who" value={el[0]} />
                        <p key={i}>{el[1]}</p>
                    </div>
                )
            })}
        </div>
    );
}