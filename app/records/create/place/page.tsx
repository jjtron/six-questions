"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/create/place/create-place';

export default async function Page() {
    
    return (
        <main>
          <div className="md:ml-2">
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Create Records', href: '/create' },
              {
                label: '\'Where\'',
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