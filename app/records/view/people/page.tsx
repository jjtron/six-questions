"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Search from '@/app/ui/records/search';
import { fetchRecordsPeople, fetchFilteredPeople } from '@/app/lib/database';
import Pagination from '@/app/ui/records/pagination';
import { searchParams } from '@/app/lib/interfaces';
import { PeopleTable } from "@/app/ui/records/view/table-people";

export default async function Page({ searchParams } : { searchParams: searchParams }) {
  const query: string = searchParams?.query || '';
  const currentPage: number = Number(searchParams?.page) || 1;
  const recordsPerPage: number = searchParams?.recordsPerPage || 10;
  const totalPages: number = await fetchRecordsPeople(query, recordsPerPage);
  const records = await fetchFilteredPeople(query, currentPage, recordsPerPage);
    
    return (
      <>
        <div className="md:ml-2">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'View Records',
              href: '/records/view/answers',
            },
            {
              label: '\'Who\'',
              href: '/records/view/people',
              active: true,
            },
          ]}
        />
        </div>
        <Search placeholder="search" showRecordsPerPage={true} />
        {(() => {
          if (records.length === 0) {
            return <div className="pl-2">NO MATCHING RECORDS</div>
          } else {
            return <>
                <PeopleTable records={records} />
                <div className="mt-2 flex w-full justify-center">
                  <Pagination totalPages={totalPages} />
                </div>
            </>
          }
        })()}
      </>
    );
}
