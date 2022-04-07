import { proxy, useSnapshot, subscribe } from 'valtio';
import { watch } from 'valtio/utils';
import { STORE } from '../store';
export type InitialObject = {
    data: STORE;
};

export const PROXY = (data: InitialObject) => {
    return proxy(data);
};

export const USESNAPSHOT = (data: InitialObject| any) => {
    return useSnapshot(data);
};

export const SUBSCRIBE = (data: InitialObject | any, callback: any) => {
    return subscribe(data, callback);
};

export const WATCH = (callback: (get: (data: InitialObject | any) => STORE) => void) => {
    return watch(callback);
};


const VALTIO = {
    proxy: PROXY,
    useSnapshot: USESNAPSHOT,
    subscribe: SUBSCRIBE,
    watch: WATCH,
}

export default VALTIO;