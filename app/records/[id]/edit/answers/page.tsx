"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/edit/answers/edit-form';
import { getDbData } from '@/app/lib/database';
import { notFound } from 'next/navigation';
import { SixAnswers } from '@/app/lib/interfaces';

export default async function Page({ params }: { params: { id: string } }) {
    const id: string = params.id;
    const record: SixAnswers[] = (await getDbData(`SELECT * FROM six_answers WHERE id = '${id}';`)).details.rows;
    const whereData = await getDbData('SELECT * FROM places');
    const whoData = await getDbData('SELECT * FROM people');

    if (!record || record.length === 0) {
      notFound();
    }

    return (
      <>
        <div className="md:ml-2">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Records', href: '/records/view/answers' },
            {
              label: 'Edit Records',
              href: `/records/${id}/edit/answers`,
              active: true,
            },
          ]}
        />
        </div>
        <Form record={record} whereOptions={whereData.details.rows} whoOptions={whoData.details.rows}></Form>
      </>
    );
}
