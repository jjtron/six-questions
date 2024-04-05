import { SelectOptions } from '@/app/lib/interfaces';
import { useState } from 'react';

export default function MultiSelectWho(props:  {options: SelectOptions} ) {

    const [hoverShow, setHoverShow] = useState(<div />);
    const [selected, setSelected] = useState([<div key={0}></div>]);

    function showHoveredAndSet (el: any) {
        let isCheckedArray: any[] = [];
        let alreadyCheckedArray: any[] = [];
        document.querySelectorAll("input[name=who]").forEach((elin: any, i) => {
            if (elin.checked) {
                Object.entries(props.options).forEach((arr) => {
                    if (arr.indexOf(elin.value) !== -1) {
                        isCheckedArray.push(
                            <div key={i} className="flex flex-row">
                                <div className="basis-1/5 text-xs bg-green-100 border-tbl-1 border-slate-400">{arr[1].name}:</div>
                                <div className="basis-4/5 text-xs bg-white border-trb-1 border-slate-400">{arr[1].comments}</div>
                            </div>
                        );
                        alreadyCheckedArray.push(arr[0]);
                    }
                });
            }
        });
        if (alreadyCheckedArray.indexOf(el[0]) === -1) {
            setHoverShow(
                <div className="flex flex-row">
                    <div className="basis-1/5 text-xs bg-yellow-100 border-tbl-1 border-slate-400" >{el[1].name}:</div>
                    <div className="basis-4/5 text-xs bg-white border-trb-1 border-slate-400">{el[1].comments}</div>
                </div>);
        } else {
            setHoverShow(<></>);
        }
        setSelected(isCheckedArray);
    }

    return (
      <div className="flex flex-row" >
        <div className="basis-48 shrink-0 h-[140px] overflow-auto">
            {Object.entries(props.options).map((el, i) => {
                return (
                    <div key={i}
                        className="flex flex-row border-1 rounded-md hover:cursor-pointer"
                        onMouseOver={() => { showHoveredAndSet (el) }}
                        onClick={() => { showHoveredAndSet (el) }}
                    >
                        <input type="checkbox" name="who" value={el[0]} />
                        <p className="pl-2">{el[1].name}</p>
                    </div>
                )
            })}
        </div>
        <div className="overflow-auto flex flex-col h-[140px]  w-full">
            <>{hoverShow}</>
            <>{selected}</>
        </div>
      </div>
    );
}

