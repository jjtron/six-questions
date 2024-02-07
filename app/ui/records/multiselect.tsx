import { useState } from 'react';

interface Options {[key: number]: string}

export default function MultiSelect(
    {options} : {options: [
        {id: string; name: string, multi: string},
        Options
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
    const m = (options[0].multi === 'yes') ? {multiple: true} : {multiple: false};
    for (const [key, val] of Object.entries(options[1])) {
        optionsList.push(<option key={key} value={key} >{val}</option>);
    }
    return (
        <select
            id={options[0].id}
            name={options[0].name} 
            {...m}
            /*  THIS CAN BE DEVELOPED LATER TO MAKE IT SO THAT A CLICK WITHOUT 
                A COMMAND KEY CAN MULTI SELECT, BUT RATHER TOGGLE THE OPTIONS
                THAT ARE SELECTED
            onChange={handleChange}
            value={selectedValues}
            */
            defaultValue={[]}
            style={{color: 'white', backgroundColor: 'black',}}
            >
            {optionsList}
        </select>
    );
}