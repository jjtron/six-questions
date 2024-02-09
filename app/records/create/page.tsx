"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/create-form';
import { getDbData } from '@/app/lib/database';
import { revalidatePath } from 'next/cache';

export default async function Page() {
    const dbResults = await getDbData('SELECT * FROM wheres');
    revalidatePath('/records/create');
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
          <Form options={dbResults.details.rows}></Form>
        </main>
    );
    
}