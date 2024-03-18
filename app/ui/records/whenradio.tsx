import { WhereOptions } from '@/app/lib/interfaces';
import { useState } from 'react';
import clsx from 'clsx';

export default function WhenRadio(
  props : {
    whereOptions: WhereOptions,
    whenMouseOver: Function,
    hoverWhenHighlight: boolean
  })
{
    const [isChecked, setIsChecked] = useState(-1);
    const [bgColor, setBgColor] = useState(-1);

    return (
      <div className="flex flex-col pb-2 bg-white" >
        { props.whereOptions[1].list.map((el, i) => {
          return (
            <div key={i} className={
              clsx(`flex flex-row border-1 border-slate-400
                    rounded-md px-2 mr-1 cursor-pointer`,
                    { "bg-white" : bgColor !== i && isChecked !== i,
                      "bg-yellow-100" : bgColor === i && isChecked !== i && props.hoverWhenHighlight,
                      "bg-green-100" : isChecked === i})} 
              onMouseOver={() => {
                  props.whenMouseOver(el, (isChecked === i));
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
                              props.whenMouseOver(el, true);
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