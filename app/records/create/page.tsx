"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/create-form';
import { getDbData } from '@/app/lib/database';
import { revalidatePath } from 'next/cache';

export default async function Page() {
    const db = await getDbData('SELECT * FROM wheres');
    const where = {where: JSON.stringify(db.details.rows)};
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
          <Form options={{where: JSON.stringify(db.details.rows)}}></Form>
        </main>
    );
    
}