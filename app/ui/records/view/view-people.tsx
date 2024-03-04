'use server';

import { fetchFilteredPeople } from '@/app/lib/database';
import { PeopleTable } from "./table-people";

export default async function Form({ query, currentPage } : { query: string, currentPage: number }) {
    const records = await fetchFilteredPeople(query, currentPage);
    return <PeopleTable records={records} />
}