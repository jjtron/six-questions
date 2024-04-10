"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/view/view-places';
import Search from '@/app/ui/records/search';
import { fetchRecordsPlaces } from '@/app/lib/database';
import Pagination from '@/app/ui/records/pagination';
import { searchParams } from '@/app/lib/interfaces';

export default async function Page({ searchParams } : { searchParams: searchParams }) {
  const query: string = searchParams?.query || '';
  const recordsPerPage: number = searchParams?.recordsPerPage || 10;
  const currentPage: number = Number(searchParams?.page) || 1;
  const totalPages: number = await fetchRecordsPlaces(query, Number(recordsPerPage));
    
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
              label: 'Places',
              href: '/records/view/places',
              active: true,
            },
          ]}
        />
        </div>
        <Search placeholder="search"  showRecordsPerPage={true} />
        <Form query={query} currentPage={currentPage} recordsPerPage={recordsPerPage}></Form>
        <div className="mt-2 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </>
    );
}
