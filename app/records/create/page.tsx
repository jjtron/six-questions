"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/create-form';
import { getDbData } from '@/app/lib/database';
import { revalidatePath } from 'next/cache';

export default async function Page() {
    const getWhereData = await getDbData('SELECT * FROM wheres');
    const getWhoData = await getDbData('SELECT * FROM whos');
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
          <Form whereOptions={getWhereData.details.rows} whoOptions={getWhoData.details.rows}></Form>
        </main>
    );
    
}