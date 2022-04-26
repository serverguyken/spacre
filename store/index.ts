import API from "../config/api";
import { User, GetUsers } from "../interface/User";
import useUserContext from "../provider/userProvider";
import VALTIO, { InitialObject } from "./valtio";
import { api_url } from "../config";
export interface STORE {
    widget_rendered: boolean;
    signup_step: {
        step: number;
        step_name: string;
        skipable: boolean;
        completed: boolean;
    }
    postTextareaShown: boolean;
    searchList: any[];
    renderNoSearch: boolean;
    fetchUsers: {
        users: User[];
        status: Object;
    };
    media: {
        files: any[];
        fileTypes: any[];
    }
    files: {
        length: number;
    };
    getUsers: (id: any) => Promise<void>;
} 

const store: {
    content: InitialObject;
    set: (name: keyof STORE, value: any) => void;
    get: (name: keyof STORE) => any;
} = {
    content: VALTIO.proxy({
        data: {
            widget_rendered: false,
            signup_step: {
                step: 1,
                step_name: "CREATING_NAME_EMAIL",
                skipable: false,
                completed: false
            },
            postTextareaShown: false,
            searchList: [],
            renderNoSearch: false,
            fetchUsers: {
                users: [],
                status: {}
            },
            media: {
                files: [],
                fileTypes: [],
            },
            files: {
                length: 0
            },
            getUsers: (id: any) => {
                return API.get(`${api_url}/get/users`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${id}`
                    },
                }).then(res => {
                    store.set('fetchUsers', {
                        users: res.data.users ? res.data.users : [],
                        status: res.data.status
                    });
                }).catch(err => {
                    if (err.response) {
                        store.set('fetchUsers', {
                            users: [],
                            status: err.response.data
                        });
                    } else {
                        store.set('fetchUsers', {
                            users: [],
                            status: {
                                code: 500,
                                success: false,
                                message: 'Something went wrong'
                            }
                        });
                    }
                });
            },
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

