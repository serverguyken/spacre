import axios from 'axios';
const API = {
    get: (url: string, config?: {}) => {
        return axios.get(url, config);
    },
    post: (url: string, data: any, options?: {}) => {
        return axios.post(url, data, options);
    },
    put: (url: string, data: any) => {
        return axios.put(url, data);
    },
    delete: (url: string) => {
        return axios.delete(url);
    },
}

export default API;