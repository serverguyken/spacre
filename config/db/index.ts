import axios from 'axios';
export const API = {
    get: (url: string) => {
        return axios.get(url);
    },
    getReturnData: (url: string) => {
        return axios.get(url).then(res => res.data);
    },
    post: (url: string, data: any) => {
        return axios.post(url, data);
    },
    put: (url: string, data: any) => {
        return axios.put(url, data);
    },
    delete: (url: string) => {
        return axios.delete(url);
    },
}