"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/create-form';
import { mutateData } from '@/app/lib/database';

export default async function Page() {
    mutateData('SELECT * FROM six_questions');

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
          <Form ></Form>
        </main>
      );
}