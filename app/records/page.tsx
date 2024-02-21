"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/view-form';
import Search from '@/app/ui/records/search';

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
        <Form query={query} currentPage={1}></Form>
      </>
    );
}
