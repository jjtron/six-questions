'use server';

import { fetchFilteredPlaces } from '@/app/lib/database';
import { PlacesTable } from "./table-places";
import { Place } from '@/app/lib/interfaces';

export default async function Form({ query, currentPage, recordsPerPage } :
    { query: string, currentPage: number, recordsPerPage: number }) {
    const placesGroups: Place[][] = await fetchFilteredPlaces(query, currentPage, recordsPerPage);
    return <PlacesTable placesGroups={placesGroups} />
}