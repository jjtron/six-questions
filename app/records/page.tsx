"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/view-form';

export default async function Page() {
    
    return (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              {
                label: 'View Records',
                href: '/records',
                active: true,
              },
            ]}
          />
          <Form></Form>
        </main>
    );
    
}
