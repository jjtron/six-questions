"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/create/person/create-person';

export default async function Page() {
    
    return (
        <main>
          <div className="md:ml-2">
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Create Records', href: '/create' },
              {
                label: '\'Who\'',
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