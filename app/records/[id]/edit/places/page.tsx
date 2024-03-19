"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/edit/places/edit-form';
import { getDbData } from '@/app/lib/database';
import { notFound } from 'next/navigation';
import { Place } from '@/app/lib/interfaces';

export default async function Page({ params }: { params: { id: string } }) {
    const id: string = params.id;
    const whereData: Place[] = (await getDbData(`SELECT * FROM places WHERE id = '${id}';`)).details.rows;
    if (!whereData || whereData.length === 0) {
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
        <Form record={whereData[0]}></Form>
      </>
    );
}
