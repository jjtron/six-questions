"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/create/place/create-place';
import { getDbData } from '@/app/lib/database';

export default async function Page() {
    const whereData = await getDbData('SELECT * FROM wheres');
    
    return (
        <main>
          <div className="md:ml-2">
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
          </div>
          <Form></Form>
        </main>
    );
    
}