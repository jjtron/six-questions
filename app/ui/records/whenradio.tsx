import { WhenRadioOptions } from '@/app/lib/interfaces';
import { useState } from 'react';
import clsx from 'clsx';

export default function WhenRadio(
  props : {
    whenRadioOptions: WhenRadioOptions,
    whenMouseOver: Function,
    hoverWhenHighlight: boolean,
    customWhenClick: Function
  })
{
    const [isChecked, setIsChecked] = useState(-1);
    const [bgColor, setBgColor] = useState(-1);

    return (
      <div className="flex flex-col pb-2 bg-white" >
        { props.whenRadioOptions[1].list.map((el, i) => {
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
                  if (props.whenRadioOptions[2]?.toString() === el.id.toString()) {
                      // input is defaultCheckn
                      return (<input className="h-[24px]" type="radio" name="custom_when" defaultChecked value={el.id} />)
                  } else {
                      // input is not checked
                      return (<input className="h-[24px]" type="radio" name="custom_when" value={el.id} 
                          onClick={() => {
                              setIsChecked(i);
                              props.whenMouseOver(el, true);
                              props.customWhenClick(i);
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