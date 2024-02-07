import { useState } from 'react';

export default function MultiSelect() {
    const [selectedValues, setVal] = useState(['0']);
    function handleChange(event: any) {
        const collection = event.target.selectedOptions;
        let newValue: string[] = [];
        for (let i = 0; i < collection.length; i++) {
            newValue.push(collection[i].value);
        }
        setVal(newValue);
    }
    return (
        <select
            id="whoid" multiple onChange={handleChange}
            name="who" defaultValue={[]} value={selectedValues}
            style={{
                color: 'white',
                backgroundColor: 'black',
            }}
            >
            <option value="0" >Me</option>
            <option value="1" >My self</option>
            <option value="2">and I</option>
        </select>
    );
}