'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
 
export default function Search(
    { placeholder, showRecordsPerPage }: 
    { placeholder: string, showRecordsPerPage: boolean; }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  showRecordsPerPage ? true : false;

  const handleSearch = useDebouncedCallback((term, recordsPerPage) => {
    setRecordsPerPage(recordsPerPage);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('recordsPerPage', recordsPerPage);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    if (recordsPerPage !== 0) {
      replace(`${pathname}?${params.toString()}`);
    }
  }, 750);
 
  return (
    <div className="flex flex-row items-center mb-1">
      <div className="relative md:ml-2">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="text-center w-[190px] border-1 border-gray-500 rounded-md hover:bg-sky-50 bg-gray-50"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value, recordsPerPage);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-1 top-1 h-[18px] w-[18px]" />
      </div>
      {(() => {
        if (showRecordsPerPage) {
          return  <div className="basis-1/3 flex flex-row items-center justify-center">
                    <input  className="input-width rounded-md border-1 border-gray-500"
                            type="text"
                            id="recordsPerPage" 
                            name="recordsPerPage"
                            defaultValue={recordsPerPage?.toString()}
                            onChange={(e) => {
                              
                              handleSearch(
                                searchParams.get('query')?.toString(),
                                Number(e.target.value)
                              )
                            }}
                    />
                    <p className="text-sm pl-1 text-left">Records per page </p>
                  </div>
        }
      })()}

    </div>
  );
}