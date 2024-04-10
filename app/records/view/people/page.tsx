"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/view/view-people';
import Search from '@/app/ui/records/search';
import { fetchRecordsPeople } from '@/app/lib/database';
import Pagination from '@/app/ui/records/pagination';
import { searchParams } from '@/app/lib/interfaces';

export default async function Page({ searchParams } : { searchParams: searchParams }) {
  const query: string = searchParams?.query || '';
  const currentPage: number = Number(searchParams?.page) || 1;
  const recordsPerPage: number = searchParams?.recordsPerPage || 10;
  const totalPages: number = await fetchRecordsPeople(query, recordsPerPage);
    
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
              label: 'People',
              href: '/records/view/people',
              active: true,
            },
          ]}
        />
        </div>
        <Search placeholder="search" />
        <Form query={query} currentPage={currentPage} recordsPerPage={recordsPerPage}></Form>
        <div className="mt-2 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </>
    );
}
