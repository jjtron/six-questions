'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
 
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
 
  return (
    <div className="relative md:ml-2 mb-2">
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
  );
}