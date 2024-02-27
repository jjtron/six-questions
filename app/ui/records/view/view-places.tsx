'use server';

import { fetchFilteredPlaces } from '@/app/lib/database';
import { PlacesTable } from "./table-places";

export default async function Form({ query, currentPage } : { query: string, currentPage: number }) {

    const records = await fetchFilteredPlaces(query, currentPage);

    return <PlacesTable records={records} />
}