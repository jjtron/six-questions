export type SelectProps = {[key: string]: string};
export type SelectOptions = {[key: number]: string};
export type WhoOptions = {index: number, name: string};
export type Person = {index: number, name: string};

export type WhereOptions = [
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
    list: Place[];
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

export type GetDbQueryResult = {
    success: boolean;
    details: { 
        rows: {
            index: number;
            name: string; 
        }[]
    };
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

