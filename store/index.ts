import VALTIO, { InitialObject } from "./valtio";

export interface STORE {
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