import { SelectOptions } from '@/app/lib/interfaces';
import { SelectProps } from '@/app/lib/interfaces';

export default function MultiSelect(
    {options} : {options: [
        SelectProps,
        SelectOptions,
        number[] | null
    ]}
) {
    /*  THIS CAN BE DEVELOPED LATER TO MAKE IT SO THAT A CLICK WITHOUT 
        A COMMAND KEY CAN MULTI SELECT, BUT RATHER TOGGLE THE OPTIONS
        THAT ARE SELECTED
    const [selectedValues, setVal] = useState(['']);
    function handleChange(event: any) {
        const collection = event.target.selectedOptions;
        let newValue: string[] = [];
        for (let i = 0; i < collection.length; i++) {
            newValue.push(collection[i].value);
        }
        setVal(newValue);
    }
    */

    let optionsList = [];
    const multi = (options[0].multi === 'yes') ? true : false;

    let dv: string[] | string;
    if (options[0].multi === 'yes') {
        dv = (options[2] === null) ? [''] : options[2].map((el) => el + '')           
    } else {
        dv = '';
    }
    
    for (const [key, val] of Object.entries(options[1])) {
        optionsList.push(<option key={key} value={key} >{val}</option>);
    }
    return (
        <select className="w-full"
            id={options[0].id}
            name={options[0].name}
            multiple={multi}
            /*  THIS CAN BE DEVELOPED LATER TO MAKE IT SO THAT A CLICK WITHOUT 
                A COMMAND KEY CAN MULTI SELECT, BUT RATHER TOGGLE THE OPTIONS
                THAT ARE SELECTED
            onChange={handleChange}
            value={selectedValues}
            */
            defaultValue={dv}
            >
            {optionsList}
        </select>
    );
}