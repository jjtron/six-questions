"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/edit/event-time/edit-form';
import { getDbData } from '@/app/lib/database';
import { notFound } from 'next/navigation';
import { GetDbQueryEventTimeResult } from '@/app/lib/interfaces';

export default async function Page({ params }: { params: { id: string } }) {
    const id: string = params.id;
    const eventTime: GetDbQueryEventTimeResult = await getDbData(`SELECT * FROM times WHERE id = '${id}';`);

    if (!eventTime || eventTime.details.rows.length === 0) {
      notFound();
    }

    return (
      <>
        <div className="md:ml-2">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Records', href: '/records/view/people' },
            {
              label: 'Edit Event-Time',
              href: `/records/${id}/edit/event-times`,
              active: true,
            },
          ]}
        />
        </div>
        <Form eventTime={eventTime.details.rows[0]}></Form>
      </>
    );
}
