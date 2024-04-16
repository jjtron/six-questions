"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Search from '@/app/ui/records/search';
import { fetchRecordsPlaces, fetchFilteredPlaces } from '@/app/lib/database';
import Pagination from '@/app/ui/records/pagination';
import { searchParams, Place } from '@/app/lib/interfaces';
import { PlacesTable } from "@/app/ui/records/view/table-places";

export default async function Page({ searchParams } : { searchParams: searchParams }) {
  const query: string = searchParams?.query || '';
  const recordsPerPage: number = searchParams?.recordsPerPage || 10;
  const currentPage: number = Number(searchParams?.page) || 1;
  const totalPages: number = await fetchRecordsPlaces(query, Number(recordsPerPage));
  const placesGroups: Place[][] = await fetchFilteredPlaces(query, currentPage, recordsPerPage);
    
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
              label: '\'Where\'',
              href: '/records/view/places',
              active: true,
            },
          ]}
        />
        </div>
        <Search placeholder="search"  showRecordsPerPage={true} />
        {(() => {
          let isEmpty: boolean = true;
          placesGroups.forEach((group: any[]) => {
            if (group.length > 0) { isEmpty = false; }
          });
          if (isEmpty) {
            return <div className="pl-2">NO MATCHING RECORDS</div>
          } else {
            return <>
              <PlacesTable placesGroups={placesGroups} />
              <div className="mt-2 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
              </div>
            </>
          }
        })()}
      </>
    );
}
