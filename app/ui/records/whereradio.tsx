import { SelectProps, RadioOptions } from '@/app/lib/interfaces';

export default function WhereRadio(
    {whereOptions} : {whereOptions: [
        SelectProps,
        RadioOptions
    ]}
) {
    
    const multi = (whereOptions[0].multi === 'yes') ? true : false;
    const dv = (whereOptions[0].multi === 'yes') ? [] : '';

    let optionsList: any[] = [];
    whereOptions[1].list.map((el, i) => {
        optionsList.push(
            <label key={i}>
                <input type="radio" name="where" value={el.name} />{el.name}
                <div>{el.details.address}</div>
                <div>{el.details.city}</div>
            </label>
        );
    });

    return (
        <div style={{color: 'white', backgroundColor: 'black',}}>
            {optionsList}
        </div>
    );
}