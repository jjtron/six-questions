"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/edit/places/edit-form';
import { getDbData } from '@/app/lib/database';

export default async function Page({ params }: { params: { id: string } }) {
    const id: any = params.id;
    const whereData = await getDbData(`SELECT * FROM wheres WHERE id = '${id}';`);
    return (
      <>
        <div className="md:ml-2">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Records', href: '/records/view/answers' },
            {
              label: 'Edit Places',
              href: '/records/${id}/edit/places',
              active: true,
            },
          ]}
        />
        </div>
        <Form record={whereData.details.rows}></Form>
      </>
    );
}
