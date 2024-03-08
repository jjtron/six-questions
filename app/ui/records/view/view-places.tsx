'use server';

import { fetchFilteredPlaces } from '@/app/lib/database';
import { PlacesTable } from "./table-places";
import { Place } from '@/app/lib/interfaces';

export default async function Form({ query, currentPage } : { query: string, currentPage: number }) {
    const placesGroups: Place[][] = await fetchFilteredPlaces(query, currentPage);
    return <PlacesTable placesGroups={placesGroups} />
}