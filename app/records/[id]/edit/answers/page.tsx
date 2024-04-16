"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
import StepperForm from '@/app/ui/records/edit/answers/stepper-form';
import { getDbData } from '@/app/lib/database';
import { notFound } from 'next/navigation';
import { SixAnswers, Person, Place, EventTime } from '@/app/lib/interfaces';


export default async function Page({ params }: { params: { id: string } }) {
    const id: string = params.id;
    const record: SixAnswers[] = (await getDbData(`SELECT * FROM six_answers WHERE id = '${id}';`)).details.rows;
    const whereOptions: Place[] = (await getDbData('SELECT * FROM places')).details.rows;
    const whoOptions: Person[] = (await getDbData('SELECT * FROM people')).details.rows;
    const whenOptions: EventTime[] = (await getDbData('SELECT * FROM times ORDER BY sort_order, name')).details.rows;

    if (!record || record.length === 0) {
      notFound();
    }

    return (
      <>
        <div className="md:ml-2">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'View Records', href: '/records/view/answers' },
            {
              label: 'Edit \'Answer\'',
              href: `/records/${id}/edit/answers`,
              active: true,
            },
          ]}
        />
        </div>
        <StepperForm record={record[0]}
              whereOptions={whereOptions}
              whoOptions={whoOptions}
              whenOptions={whenOptions}>
        </StepperForm>
      </>
    );
}
