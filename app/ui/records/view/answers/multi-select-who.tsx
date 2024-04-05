import { SelectOptions } from '@/app/lib/interfaces';
import clsx from 'clsx';

export default function MultiSelectWho(props:  {options: SelectOptions, initSelected: number[] } ) {

    return (
        <div className="overflow-auto flex flex-col h-[140px] w-full px-2">
            {initSelected(props.initSelected)}
        </div>
    );

    function initSelected(initSelected: number[]) : any[] {
        const optionsArray = Object.entries(props.options);
        let selectedList: any[] | undefined;
        let definedStoredList: any[] = [];
        initSelected.forEach((selectedEl, i) => {
            selectedList = optionsArray.find((optionsArrayEl: any) => {
                return (Number(optionsArrayEl[1].index) === selectedEl);
            });
            
            if (typeof selectedList !== 'undefined') {
                definedStoredList.push(selectedList);
            }
        });
        let isCheckedArray: any[] = [];
        definedStoredList.forEach((storedEl: any, j) => {
            isCheckedArray.push(
                <div key={j} className="flex flex-row">
                    <div className={clsx(`basis-1/5 text-sm bg-green-100 
                                          border-tl-1 border-slate-400 px-2 `,
                                          { "rounded-tl-md" : j === 0,
                                            "rounded-bl-md border-tlb-1" : j === definedStoredList.length - 1
                                          })}>{storedEl[1].name}:</div>
                    <div className={clsx(`basis-4/5 text-xs bg-white 
                                          border-tr-1 border-slate-400`,
                                          { "rounded-tr-md" : j === 0,
                                            "rounded-br-md border-trb-1" : j === definedStoredList.length - 1
                                          })}>{storedEl[1].comments}</div>
                </div>
            );
        });
        return(isCheckedArray);
    }
}