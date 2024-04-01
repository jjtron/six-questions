import { WhereRadioOptions } from '@/app/lib/interfaces';
import { useState } from 'react';
import clsx from 'clsx';

export default function WhereRadio(
    props : {
      whereRadioOptions: WhereRadioOptions,
      whereMouseOver: Function,
      hoverWhereHighlight: boolean
    })
{
    let n: number = -1; // n will remain -1 in the case of where this 
                        // component is used to CREATE a 6-Answers record
    props.whereRadioOptions[1].list.forEach((place, i) => {
      if (place.id === props.whereRadioOptions[2]) {
        n = i;
      }
    });
    
    const [isChecked, setIsChecked] = useState(n);
    const [bgColor, setBgColor] = useState(n);

    return (
      <div className="flex flex-col pb-2 bg-white" >
        { props.whereRadioOptions[1].list.map((el, i) => {
          return (
            <div key={i} className={
              clsx(`flex flex-row border-1 border-slate-400
                    rounded-md px-2 mr-1 cursor-pointer`,
                    { "bg-white" : bgColor !== i && isChecked !== i,
                      "bg-yellow-100" : bgColor === i && isChecked !== i && props.hoverWhereHighlight,
                      "bg-green-100" : isChecked === i})} 
              onMouseOver={() => {
                  props.whereMouseOver(el, (isChecked === i));
                  setBgColor(i);
              }}
            >
              {
                (function () {
                  if (props.whereRadioOptions[2]?.toString() === el.id.toString()) {
                      // input is defaultChecked
                      return (<input className="h-[24px]" type="radio" name="where" defaultChecked value={el.id}
                          onClick={() => {
                              setIsChecked(i);
                              props.whereMouseOver(el, true);
                          }}/> )
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