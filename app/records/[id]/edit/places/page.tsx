"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/edit/places/edit-form';
import { getDbData } from '@/app/lib/database';
import { notFound } from 'next/navigation';
import { GetDbQueryResult } from '@/app/lib/interfaces';

export default async function Page({ params }: { params: { id: string } }) {
    const id: string = params.id;
    const whereData: GetDbQueryResult = await getDbData(`SELECT * FROM places WHERE id = '${id}';`);
    if (!whereData || whereData.details.rows.length === 0) {
      notFound();
    }
    
    return (
      <>
        <div className="md:ml-2">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Records', href: '/records/view/answers' },
            {
              label: 'Edit Place',
              href: `/records/${id}/edit/places`,
              active: true,
            },
          ]}
        />
        </div>
        <Form record={whereData.details.rows[0]}></Form>
      </>
    );
}
