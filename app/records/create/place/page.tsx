"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/place/create-where';
import { getDbData } from '@/app/lib/database';

export default async function Page() {
    const whereData = await getDbData('SELECT * FROM wheres');
    const whoData = await getDbData('SELECT * FROM whos');
    
    return (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Records', href: '/create' },
              {
                label: 'Create Place',
                href: '/create/place',
                active: true,
              },
            ]}
          />
          <Form></Form>
        </main>
    );
    
}