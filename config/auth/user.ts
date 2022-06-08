import { auth, OnAuthStateChanged, collectionRef, docRef, AddDoc, SetDoc, UpdateDoc, DeleteDoc, GetDoc, GetDocs, createDocRef } from './firebase';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, GithubAuthProvider, getRedirectResult } from 'firebase/auth';
import { Space, User } from '../../interface/User';
import API from '../api';
import store from '../../store';
import { api_url } from '..';

export const u_createUserWithEmailAndPassword = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
};

export function u_signInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function u_updateProfile(user: any, prop: { displayName: string }) {
    return updateProfile(user, prop);
}

export function u_signOut() {
    return auth.signOut();
}
export function getCurrentUser(callback: (user: any) => void) {
    const authChange = () => {
        const unsubscribe = u_onAuthStateChanged((user: any) => {
            callback(user);
        });
        return unsubscribe;
    };
    return authChange();
}
export function u_onAuthStateChanged(callback: (user: any) => void) {
    OnAuthStateChanged(callback);
}   

export function u_signInWithGitHub() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
}

export const u_addUserName = (user_name: string, email: string) => {
    const response = API.post(`${api_url}/create/username`, {
        name: user_name,
        email
    })
    return response;
};

export const u_getUserName = (id: string) => {
    const response = API.get(`${api_url}/get/username`)
    return response;
};

export const u_getUserNames = () => {
    const response = API.get(`${api_url}/get/usernames`)
    return response;
};

export const u_updateUserName = (id: string, user_name: string) => {
    const usernamesCollectionRef: any = docRef('usernames', id);
    return UpdateDoc(usernamesCollectionRef, {
        name: user_name,
    });
};

export const u_deleteUserName = (id: string) => {
    const usernamesCollectionRef: any = docRef('usernames', id);
    return DeleteDoc(usernamesCollectionRef);
};


export const u_addUser = (id: any, data: {}) => {
    const usersCollectionRef: any = docRef('users', id);
    return SetDoc(usersCollectionRef, data);
};

export const u_getUser = (id: any) => {
    const response = API.get(`${api_url}/get/user?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${id}`
        }
    })
    return response;
};


export const u_getUserDB = (id: any) => {
    const spacesDocumentnRef: any = createDocRef('users', id);
    return GetDoc(spacesDocumentnRef);
};




export const u_getUsers = (id: any) => {
    const response = API.get(`${api_url}/get/users`, {
        headers: {
            'Authorization': `Bearer ${id}`
        }
    })
    return response;
};


export const u_updateUser = (id: any, data: {}) => {
    const usersDocumentnRef: any = createDocRef('users', id);
    return SetDoc(usersDocumentnRef, data, true);  
};

export const u_deleteUser = (id: any) => {
    const usersCollectionRef: any = docRef('users', id);
    return DeleteDoc(usersCollectionRef);
};

export const u_addSpace = (id: any, data: {}) => { 
    const response = API.post(`${api_url}/create/space`, data, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${id}`
        }
    })
    return response;
};
export const u_getSpaces = (id: any, limit: number) => { 
    const response = API.get(`${api_url}/get/spaces?limit=${limit}`, {
        headers: {
            'Authorization': `Bearer ${id}`
        }
    })
    return response;
};
export const u_updateSpace = (id: any, data: Space) => {
    const spacesDocumentnRef: any = createDocRef('spaces', id);
    return SetDoc(spacesDocumentnRef, data, true);    
}

export const u_getSpace = (id: any) => {
    const spacesDocumentnRef: any = createDocRef('spaces', id);
    return GetDoc(spacesDocumentnRef);
}
export function u_getRedirectResult(auth: any) {
    return getRedirectResult(auth);
}


export const u_GitHubProvider = GithubAuthProvider;