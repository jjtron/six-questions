"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/view/view-answers';
import Search from '@/app/ui/records/search';
import { fetchRecordsPages } from '@/app/lib/database';
import Pagination from '@/app/ui/records/pagination';
import { searchParams } from '@/app/lib/interfaces';

export default async function Page({ searchParams } : { searchParams: searchParams })
{
  const query: string = searchParams?.query || '';
  const currentPage: number = Number(searchParams?.page) || 1;
  const totalPages: number = await fetchRecordsPages(query);
    
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
