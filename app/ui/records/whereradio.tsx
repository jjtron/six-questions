import { WhereOptions } from '@/app/lib/interfaces';
import { useState } from 'react';
import clsx from 'clsx';

export default function WhereRadio( props : {whereOptions: WhereOptions, whereMouseOver: Function })
{
    const [isChecked, setIsChecked] = useState(-1);
    const [bgColor, setBgColor] = useState(-1);

    return (
        <div className="flex flex-col pb-2 v-flow" >
            { props.whereOptions[1].list.map((el, i) => {
                return (
                    <div key={i} className={
                            clsx(`flex flex-row border-1 border-slate-400
                                  rounded-md px-2 mt-1 mr-1 cursor-pointer`,
                                  { "bg-white" : bgColor !== i && isChecked !== i,
                                    "bg-yellow-100" : bgColor === i && isChecked !== i,
                                    "bg-green-100" : isChecked === i})} 
                            onMouseOver={() => {
                                props.whereMouseOver(el, (isChecked === i));
                                setBgColor(i);
                            }}
                    >
                        {
                            (function () {
                                if (props.whereOptions[2]?.toString() === el.id.toString()) {
                                    // input is defaultChecked
                                    return (<input className="h-[24px]" type="radio" name="where" defaultChecked value={el.id} /> )
                                } else {
                                    // input is not checked
                                    return (<input className="h-[24px]" type="radio" name="where" value={el.id} 
                                                onClick={() => {
                                                    setIsChecked(i);
                                                    props.whereMouseOver(el, true);
                                                }}/> )
                                }
                            })()
                            
                        }
                        <div className="pl-2">{el.name}</div>
                    </div>
                )
            })}
        </div>
    );
}