export type SelectProps = {[key: string]: string};
export type SelectOptions = {[key: number]: string};
export type WhoOptions = {index: number, name: string};
export type Person = {index: number, name: string};

export type WhereRadioOptions = [
    SelectProps,
    RadioOptions,
    number | null
]

export type InsertWhenTime = {
    type: number;
    date?: string;
    time?: string;
    yr_mon?: string;
    date_only_pre1900?: string;
    year_mon_pre1900?: string;
    yr_only_pre1900?: string;
    customID?: number;
}

export type WhenRadioOptions = [
    SelectProps,
    RadioOptions,
    number | null
]

export type Place = {
    id: number;
    name: string;
    details: {
        city?: string;
        street?: string;
        state?: string;
        desc?: string;
    },
    type: string;
    sort_order: number;
}

export type EventTime = {
    id: number;
    name: string;
    comments: string;
    type: string;
    sort_order: number;
}

export type RadioOptions = {
    list: Place[] | EventTime[];
};

export type SixAnswers = {
    id: string;
    who: number[];
    what: string;
    where: number,
    when: { date: string; time: string; },
    why: string;
    how: string;
}

export type GetDbQueryPersonResult = {
    success: boolean;
    details: { rows: Person[]; }
}

export type GetDbQueryEventTimeResult = {
    success: boolean;
    details: { rows: EventTime[]; }
}

export type searchParams = {
    query?: string;
    page?: string;
    recordsPerPage?: number;
}

export type whoOptions = { 
    index: number;
    name: string;
}

