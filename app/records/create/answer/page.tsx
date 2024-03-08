"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/create/answer/create-answers';
import { getDbData } from '@/app/lib/database';
import { GetDbQueryResult } from '@/app/lib/interfaces';

export default async function Page() {
    const whereData: GetDbQueryResult = await getDbData('SELECT * FROM places');
    const whoData: GetDbQueryResult = await getDbData('SELECT * FROM people');
    
    return (
        <main>
          <div className="md:ml-2">
            <Breadcrumbs
              breadcrumbs={[
                { label: 'Records', href: '/records/view/answers' },
                {
                  label: 'Create 6-answers Record',
                  href: '/records/create/answer',
                  active: true,
                },
              ]}
            />
          </div>
          <Form whereOptions={whereData.details.rows} whoOptions={whoData.details.rows}></Form>
        </main>
    );
    
}