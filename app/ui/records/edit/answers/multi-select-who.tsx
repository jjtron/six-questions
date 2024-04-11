import { SelectOptions } from '@/app/lib/interfaces';
import { useState } from 'react';

export default function MultiSelectWho(props:  {options: SelectOptions, initSelected: number[] } ) {

    const [hoverShow, setHoverShow] = useState(<div key={0} />);
    const [selected, setSelected] = useState(initSelected(props.initSelected));

    initSelected(props.initSelected);

    return (
      <div className="flex flex-row max-[431px]:flex-col" >
        <div className="max-[431px]:text-xs text-base max-[431px]:basis-32 basis-48 shrink-0 h-[140px] overflow-auto">
            {Object.entries(props.options).map((el, i) => {
                return (
                    <div key={i}
                        className="flex flex-row border-1 rounded-md hover:cursor-pointer"
                        onMouseOver={() => { showHoveredAndSet (el) }}
                        onClick={() => { showHoveredAndSet (el) }}
                    >
                        <input type="checkbox" name="who" value={el[0]}
                            defaultChecked={ props.initSelected.indexOf(Number(el[0])) !== -1 ? true : false } />
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

    function initSelected(initSelected: number[]) : any[] {
        const optionsArray = Object.entries(props.options);
        let isCheckedArray: any[] = [];
        initSelected.forEach((selectedEl, i) => {
            const selectedList: any[] | undefined = optionsArray.find((optionsArrayEl: any) => {
                return (Number(optionsArrayEl[0]) === selectedEl);
            });
            if (typeof selectedList !== 'undefined') {
                isCheckedArray.push(
                    <div key={i} className="flex flex-row max-[431px]:flex-col">
                        <div className="max-[431px]:basis-1/2 basis-1/5 text-xs bg-green-100 border-tbl-1 border-slate-400">{selectedList[1].name}:</div>
                        <div className="max-[431px]:basis-1/2 basis-4/5 text-xs bg-white border-trb-1 border-slate-400">{selectedList[1].comments}</div>
                    </div>
                );
            }
        });
        return(isCheckedArray);
    }

    function showHoveredAndSet (el: any) {
        let isCheckedArray: any[] = [];
        let alreadyCheckedArray: any[] = [];
        document.querySelectorAll("input[name=who]").forEach((elin: any, i) => {
            if (elin.checked) {
                Object.entries(props.options).forEach((arr) => {
                    if (arr.indexOf(elin.value) !== -1) {
                        isCheckedArray.push(
                            <div key={i} className="flex flex-row max-[431px]:flex-col">
                                <div className="max-[431px]:basis-1/2 basis-1/5 text-xs bg-green-100 border-tbl-1 border-slate-400">{arr[1].name}:</div>
                                <div className="max-[431px]:basis-1/2 basis-4/5 text-xs bg-white border-trb-1 border-slate-400">{arr[1].comments}</div>
                            </div>
                        );
                        alreadyCheckedArray.push(arr[0]);
                    }
                });
            }
        });
        if (alreadyCheckedArray.indexOf(el[0]) === -1) {
            setHoverShow(
                <div className="flex flex-row max-[431px]:flex-col">
                    <div className="max-[431px]:basis-1/2 basis-1/5 text-xs bg-yellow-100 border-tbl-1 border-slate-400" >{el[1].name}:</div>
                    <div className="max-[431px]:basis-1/2 basis-4/5 text-xs bg-white border-trb-1 border-slate-400">{el[1].comments}</div>
                </div>);
        } else {
            setHoverShow(<></>);
        }
        setSelected(isCheckedArray);
    }
}

