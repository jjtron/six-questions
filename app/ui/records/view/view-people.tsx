'use server';

import { fetchFilteredPeople } from '@/app/lib/database';
import { PeopleTable } from "./table-people";

export default async function Form(
    { query, currentPage, recordsPerPage } : 
    { query: string, currentPage: number, recordsPerPage: number }) {
    const records = await fetchFilteredPeople(query, currentPage, recordsPerPage);
    return <PeopleTable records={records} />
}