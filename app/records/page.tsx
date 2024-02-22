"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/view-form';
import Search from '@/app/ui/records/search';
import { fetchInvoicesPages } from '@/app/lib/database';
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
  const totalPages = await fetchInvoicesPages(query);
    
    return (
      <>
        <div className="md:ml-2">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'View Records',
              href: '/records',
              active: true,
            },
          ]}
        />
        </div>
        <Search placeholder="search" />
        <Form query={query} currentPage={currentPage}></Form>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </>
    );
}
