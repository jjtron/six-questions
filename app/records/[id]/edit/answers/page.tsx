"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/edit/answers/edit-form';
import { getDbData } from '@/app/lib/database';
import { notFound } from 'next/navigation';
import { SixAnswers, whoOptions, Place } from '@/app/lib/interfaces';

export default async function Page({ params }: { params: { id: string } }) {
    const id: string = params.id;
    const record: SixAnswers[] = (await getDbData(`SELECT * FROM six_answers WHERE id = '${id}';`)).details.rows;
    const whereOptions: Place[] = (await getDbData('SELECT * FROM places')).details.rows;
    const whoOptions: whoOptions[] = (await getDbData('SELECT * FROM people')).details.rows;

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
        <Form record={record}
              whereOptions={whereOptions}
              whoOptions={whoOptions}>
        </Form>
      </>
    );
}
