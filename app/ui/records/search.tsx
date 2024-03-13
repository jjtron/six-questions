'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
 
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('recordsPerPage', recordsPerPage + '');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 600);
 
  return (
    <div className="flex flex-row items-center">
      <div className="relative md:ml-2">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="text-center w-[190px] border-1 border-gray-500 rounded-md hover:bg-sky-50 bg-gray-50"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-1 top-1 h-[18px] w-[18px]" />
      </div>
      <div className="basis-1/3 flex flex-row items-center justify-center">
      <p className="text-sm pr-1 w-[75px] text-center">Records per page </p>
        <input  className="input-width"
                type="text"
                id="recordsPerPage" 
                name="recordsPerPage"
                defaultValue={recordsPerPage?.toString()}
                onChange={(e) => {setRecordsPerPage(Number(e.target.value));}}
        />
      </div>
    </div>
  );
}