"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/answer/create-form';
import { getDbData } from '@/app/lib/database';

export default async function Page({rectype} : {rectype: any}) {
    const whereData = await getDbData('SELECT * FROM wheres');
    const whoData = await getDbData('SELECT * FROM whos');
    
    return (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Records', href: '/records' },
              {
                label: 'Create Record',
                href: '/records/create',
                active: true,
              },
            ]}
          />
          <Form whereOptions={whereData.details.rows} whoOptions={whoData.details.rows}></Form>
        </main>
    );
    
}