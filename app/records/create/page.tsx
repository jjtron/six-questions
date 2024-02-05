"use server"

import Breadcrumbs from '@/app/ui/records/breadcrumbs';
export default async function Page() {


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
          create
          {/*
          <Button className="mt-4 w-full" showdatalink={showdatalink}></Button>
          
          <Form customers={customers} />
          */}
        </main>
      );
}