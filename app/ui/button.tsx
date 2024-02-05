import clsx from 'clsx';
import Link from 'next/link';

export function Button(
  { className, showdatalink } : 
  { className: any, showdatalink: any }) {
  return (
    <Link href={showdatalink}>
      <div
        className={clsx(
          'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
          className,
        )}
      ><p className="md:block">Call API</p></div>
    </Link>
  );
}
