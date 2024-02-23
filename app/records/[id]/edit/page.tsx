"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/edit/edit-form';
import { fetchRecordById } from '@/app/lib/database';
import { getDbData } from '@/app/lib/database';

export default async function Page({ params }: { params: { id: string } }) {
    const id: any = params.id;
    const [record] = await Promise.all([
        fetchRecordById(id)
    ]);
    const whereData = await getDbData('SELECT * FROM wheres');
    const whoData = await getDbData('SELECT * FROM whos');

    return (
      <>
        <div className="md:ml-2">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Records', href: '/records' },
            {
              label: 'Edit Records',
              href: '/records/${id}/edit',
              active: true,
            },
          ]}
        />
        </div>
        <Form record={record} whereOptions={whereData.details.rows} whoOptions={whoData.details.rows}></Form>
      </>
    );
}
