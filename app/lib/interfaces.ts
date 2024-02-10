export type SelectProps = {[key: string]: string};
export type SelectOptions = {[key: number]: string};
export type WhoOptions = {index: number, name: string};

export type RadioOptions = {
    list: [
        {name: string;
            details: {
                city: string;
                address: string
            }
        }
    ]
};