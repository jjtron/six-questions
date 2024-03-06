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