"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
//import Form from '@/app/ui/records/view/view-answers';
import Search from '@/app/ui/records/search';
import { fetchRecordsPages } from '@/app/lib/database';
import Pagination from '@/app/ui/records/pagination';
import { searchParams } from '@/app/lib/interfaces';
import StepperForm from '@/app/ui/records/view/answer/stepper-form';
import { getDbData } from "@/app/lib/database";
import { fetchFilteredRecords } from '@/app/lib/database';
import { Person, Place, SixAnswers } from '@/app/lib/interfaces';

export default async function Page({ searchParams } : { searchParams: searchParams })
{
  const query: string = searchParams?.query || '';
  const currentPage: number = Number(searchParams?.page) || 1;
  const totalPages: number = await fetchRecordsPages(query);

  const whoList: Person[] = (await getDbData(`SELECT * FROM people;`)).details.rows;
  const whereDefs: Place[] = (await getDbData(`SELECT * FROM places`)).details.rows;
  const records: SixAnswers[] = await fetchFilteredRecords(query, currentPage);
  const dataPackage: any[][] = [whoList, whereDefs, records]
    
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
        {/* <Form query={query} currentPage={currentPage}></Form> */}
        <StepperForm currentPage={currentPage} dataPackage={dataPackage}></StepperForm>
        <div className="mt-2 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </>
    );
}
