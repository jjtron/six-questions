"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import Form from '@/app/ui/records/create/answer/create-answers';
import { getDbData } from '@/app/lib/database';

export default async function Page({rectype} : {rectype: any}) {
    const whereData = await getDbData('SELECT * FROM wheres');
    const whoData = await getDbData('SELECT * FROM whos');
    
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