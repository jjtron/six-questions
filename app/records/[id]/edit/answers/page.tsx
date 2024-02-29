"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/edit/answers/edit-form';
import { getDbData } from '@/app/lib/database';

export default async function Page({ params }: { params: { id: string } }) {
    const id: any = params.id;
    const record: any = (await getDbData(`SELECT * FROM six_questions WHERE id = '${id}';`)).details.rows;
    const whereData = await getDbData('SELECT * FROM wheres');
    const whoData = await getDbData('SELECT * FROM whos');

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
