export type SelectProps = {[key: string]: string};
export type SelectOptions = {[key: number]: string};
export type WhoOptions = {index: number, name: string};

export type RadioOptions = {
    list: [{   
              id: string;
              name: string;
              details: {
                  city: string;
                  street: string
              }
           }]
};