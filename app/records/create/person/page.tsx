"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/create/person/create-person';
import { getDbData } from '@/app/lib/database';

export default async function Page() {
    const whereData = await getDbData('SELECT * FROM places');
    
    return (
        <main>
          <div className="md:ml-2">
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Records', href: '/create' },
              {
                label: 'Create Person Record (who)',
                href: '/create/person',
                active: true,
              },
            ]}
          />
          </div>
          <Form></Form>
        </main>
    );
    
}