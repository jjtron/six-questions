"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/create/answer/create-answers';
import { getDbData } from '@/app/lib/database';
import { WhoOptions, Place } from '@/app/lib/interfaces';

export default async function Page() {

    const whereOptions: Place[] = (await getDbData('SELECT * FROM places')).details.rows;
    const whoOptions: WhoOptions[] = (await getDbData('SELECT * FROM people')).details.rows;

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
          <Form whoOptions={whoOptions} whereOptions={whereOptions}></Form>
        </main>
    );
    
}