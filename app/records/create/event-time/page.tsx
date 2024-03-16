"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/create/event-time/create-time';

export default async function Page() {
    
    return (
        <main>
          <div className="md:ml-2">
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Records', href: '/create' },
              {
                label: 'Create Event Time',
                href: '/create/event-time',
                active: true,
              },
            ]}
          />
          </div>
          <Form></Form>
        </main>
    );
    
}