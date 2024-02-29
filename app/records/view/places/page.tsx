"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/view/view-places';
import Search from '@/app/ui/records/search';
import { fetchRecordsPlaces } from '@/app/lib/database';
import Pagination from '@/app/ui/records/pagination';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchRecordsPlaces(query);
    
    return (
      <>
        <div className="md:ml-2">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'View Records',
              href: '/records/view/answers',
              active: true,
            },
            {
              label: 'Places',
              href: '/records/view/places',
              active: true,
            },
          ]}
        />
        </div>
        <Search placeholder="search" />
        <Form query={query} currentPage={currentPage}></Form>
        <div className="mt-2 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </>
    );
}
