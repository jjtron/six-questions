import { SelectOptions } from '@/app/lib/interfaces';
import { SelectProps } from '@/app/lib/interfaces';

export default function MultiRadio(
    {options} : {options: [
        SelectProps,
        SelectOptions
    ]}
) {
    let optionsList = [];
    const multi = (options[0].multi === 'yes') ? true : false;
    const dv = (options[0].multi === 'yes') ? [] : '';
    for (const [key, val] of Object.entries(options[1])) {
        optionsList.push(<label><input type="radio" key={key} name="where" value={val} />{val}</label>);
    }
    return (
        <div style={{color: 'white', backgroundColor: 'black',}}>
            {optionsList}
        </div>
    );
}