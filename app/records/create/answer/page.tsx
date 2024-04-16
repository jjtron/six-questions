"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import StepperForm from '@/app/ui/records/create/answer/stepper-form';
import { getDbData } from '@/app/lib/database';
import { Person, Place, EventTime } from '@/app/lib/interfaces';

export default async function Page() {

    const whereOptions: Place[] = (await getDbData('SELECT * FROM places')).details.rows;
    const whoOptions: Person[] = (await getDbData('SELECT * FROM people')).details.rows;
    const whenOptions: EventTime[] = (await getDbData('SELECT * FROM times ORDER BY sort_order, name')).details.rows;

    return (
        <main>
          <div className="md:ml-2">
            <Breadcrumbs
              breadcrumbs={[
                { label: 'Create Records', href: '/records/view/answers' },
                {
                  label: '\'Answer\'',
                  href: '/records/create/answer',
                  active: true,
                },
              ]}
            />
          </div>
          <StepperForm whoOptions={whoOptions}
                whereOptions={whereOptions}
                whenOptions={whenOptions}>
          </StepperForm>
        </main>
    );
    
}