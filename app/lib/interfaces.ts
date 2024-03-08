export type SelectProps = {[key: string]: string};
export type SelectOptions = {[key: number]: string};
export type WhoOptions = {index: number, name: string};

export type RadioOptions = {
    list: [{   
              id: string;
              name: string;
              details: {
                  city: string;
                  street: string;
                  state: string;
              }
           }]
};

export type Place = {
    id: number;
    name: string;
    details: {
        city: string;
        street: string;
        state: string;
    },
    type: string;
    sort_order: number;
}

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
}
