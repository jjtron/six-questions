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
    const n: number = props.whereRadioOptions[1].list.findIndex((place) => place.id === props.whereRadioOptions[2]);
    const [isChecked, setIsChecked] = useState(n);
    const [bgColor, setBgColor] = useState(n);

    return (
      <div className="flex flex-col pb-2 bg-slate-100" >
        { props.whereRadioOptions[1].list.map((el, i) => {
          return (
            <div key={i} className={
              clsx(`flex flex-row border-1 border-slate-400 cursor-pointer 
                    max-[431px]:text-xs text-base rounded-md px-2 mr-1 `,
                    { "bg-white" : ( bgColor !== i && isChecked !== i ) || ( bgColor === i && isChecked !== i && !props.hoverWhereHighlight ),
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
                      return (<input className="max-[431px]:h-[16px] h-[24px]" type="radio" name="where" defaultChecked value={el.id}
                          onClick={() => {
                              setIsChecked(i);
                              props.whereMouseOver(el, true);
                          }}/> )
                  } else {
                      // input is not checked
                      return (<input className="max-[431px]:h-[16px] h-[24px]" type="radio" name="where" value={el.id} 
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