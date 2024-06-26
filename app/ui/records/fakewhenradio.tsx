import { WhenRadioOptions } from '@/app/lib/interfaces';

export default function FakeWhenRadio(
  props : {
    whenRadioOptions: WhenRadioOptions
  })
{
    return (
      <div className="flex flex-col pb-2 bg-white" >
        { props.whenRadioOptions[1].list.map((el, i) => {
          return (
            <div key={i} className="flex flex-row border-1 border-slate-300 items-center
                                    rounded-md px-2 mr-1 cursor-pointer bg-slate-100 
                                    max-[431px]:text-xs text-base"
            >
              <input disabled className="max-[431px]:h-[16px] h-[24px]" type="radio" name="custom_when" value={el.id} />
              <div className="pl-2 font-normal max-[431px]:text-xs text-sm">{el.name}</div>
            </div>
          )
        })}
      </div>
    );
}