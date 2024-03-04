"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/edit/people/edit-person';
import { getDbData } from '@/app/lib/database';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id: any = params.id;
    const person = await getDbData(`SELECT * FROM people WHERE index = '${id}';`);

    if (!person || person.details.rows.length === 0) {
      notFound();
    }
    
    return (
      <>
        <div className="md:ml-2">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Records', href: '/records/view/people' },
            {
              label: 'Edit Person',
              href: `/records/${id}/edit/people`,
              active: true,
            },
          ]}
        />
        </div>
        <Form person={person.details.rows[0]}></Form>
      </>
    );
}
