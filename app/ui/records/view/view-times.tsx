'use server';

import { fetchFilteredTimes } from '@/app/lib/database';
//import { fetchFilteredPlaces } from '@/app/lib/database';
import { EventTimesTable } from "./table-event-times";
//import { Place } from '@/app/lib/interfaces';

export default async function Form({ query, currentPage, recordsPerPage } :
    { query: string, currentPage: number, recordsPerPage: number }) {
    const eventTimesGroups = await fetchFilteredTimes(query, currentPage, recordsPerPage);
    return <EventTimesTable eventTimesGroups={eventTimesGroups} />
}
