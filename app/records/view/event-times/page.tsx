"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Search from '@/app/ui/records/search';
import { fetchRecordsTimes, fetchFilteredTimes } from '@/app/lib/database';
import Pagination from '@/app/ui/records/pagination';
import { searchParams } from '@/app/lib/interfaces';
import { EventTimesTable } from "@/app/ui/records/view/table-event-times";

export default async function Page({ searchParams } : { searchParams: searchParams }) {
  const query: string = searchParams?.query || '';
  const recordsPerPage: number = searchParams?.recordsPerPage || 10;
  const currentPage: number = Number(searchParams?.page) || 1;
  const totalPages: number = await fetchRecordsTimes(query, Number(recordsPerPage));
  const eventTimesGroups = await fetchFilteredTimes(query, currentPage, recordsPerPage);

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
              label: 'Event-Times',
              href: '/records/view/places',
              active: true,
            },
          ]}
        />
        </div>
        <Search placeholder="search" showRecordsPerPage={true} />
        {(() => {
          let isEmpty: boolean = true;
          eventTimesGroups.forEach((group: any[]) => {
            if (group.length > 0) { isEmpty = false; }
          });
          if (isEmpty) {
            return <div className="grid content-center h-3/6 text-center">NO MATCHING RECORDS</div>
          } else {
            return <>
              <EventTimesTable eventTimesGroups={eventTimesGroups} ></EventTimesTable>
              <div className="mt-2 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
              </div>
            </>
          }
        })()}
      </>
    );
}
