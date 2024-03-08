import clsx from 'clsx';
import Link from 'next/link';

export function Button(
  { cName, showdatalink, buttontext, isDisabled } : 
  { cName: string, showdatalink: string, buttontext: string, isDisabled?: string }) {

  return (
    <Link href={showdatalink} className={isDisabled} >
      <div
        className={clsx(
          'flex flex-col h-10 justify-center rounded-lg bg-blue-500 my-0.5 ' + 
          'px-4 text-sm font-medium text-white transition-colors ' + 
          'hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 ' + 
          'focus-visible:outline-offset-2 focus-visible:outline-blue-500 ' + 
          'active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
          cName,
        )}
      >
        <p className="justify-center text-center">{buttontext}</p>
      </div>
    </Link>
  );
}
