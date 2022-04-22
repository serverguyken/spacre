import VALTIO, { InitialObject } from "./valtio";

export interface STORE {
    signup_step: {
        step: number;
        step_name: string;
        skipable: boolean;
        completed: boolean;
    }
    postTextareaShown: boolean;
    searchList: any[];
    renderNoSearch: boolean;
}

const store: {
    content: InitialObject;
    set: (name: keyof STORE, value: any) => void;
    get: (name: keyof STORE) => any;
} = {
    content: VALTIO.proxy({
        data: {
            signup_step: {
                step: 1,
                step_name: "CREATING_NAME_EMAIL",
                skipable: false,
                completed: false
            },
            postTextareaShown: false,
            searchList: [],
            renderNoSearch: false,
        } as STORE,
    }),
    set: (name: keyof STORE, value: any) => {
        if (name in store.content.data) {
            store.content.data[name] = value;
        } else {
            throw new Error(`intented to set ${name} to ${value} but it is not available in the store`);
        }
    },
    get: (name: keyof STORE) => {
        if (name in store.content.data) {
            return store.content.data[name];
        } else {
            throw new Error(`content data '${name}' is not available in the store`);
        }
    },
}

export default store;