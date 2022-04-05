import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/auth/firebase";
import {
    u_signInWithEmailAndPassword,
    u_createUserWithEmailAndPassword,
    u_updateProfile,
    u_signOut,
    u_onAuthStateChanged,
    u_GitHubProvider,
    u_signInWithGitHub,
    u_getRedirectResult,
    u_addUser,
    u_getUser,
    u_updateUser,
    u_deleteUser,
    u_getUsers,
    u_addUserName,
    u_getUserName,
    u_deleteUserName,
    u_getUserNames,
    getCurrentUser,
} from "../config/auth/user";
import { User, UserContext } from "../interface/User";

import {isBrowser, print} from "../utils";

const userContext = createContext({} as UserContext);

export default function useUserContext() {
    return useContext(userContext);
}


export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState({
        isAuthenticated: null, // set to null to indicate loading of user becuase at initial load, user is null
        uid: "",
        email: "",
        fullName: "",
        userName: "",
        photoURL: "",
        authenticatedFrom: {
            providerId: "",
            provider: "",
        }

    } as User);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasError, setHasError] = useState(error ? error !== "" : false);
    useEffect(() => {
        return getCurrentUser((uuser: any) => {
            if (uuser) {
                const Uuser: User = {
                    isAuthenticated: !!uuser, 
                    uid: uuser.uid,
                    email: uuser.email,
                    fullName: uuser.displayName,
                    userName: uuser.displayName,
                    photoURL: uuser.photoURL,
                    authenticatedFrom: {
                        providerId: uuser.providerData[0].uid,
                        provider: uuser.providerData[0].providerId.split('.com')[0],
                    }
                }
                setUser(Uuser);
                const userDoc = u_getUser(uuser.uid);
                userDoc.then((doc: any) => {
                    if (doc.exists) {
                        const data = doc.data();
                        if (data.fullName) {
                            setUser({
                                ...Uuser,
                                fullName: 'data.fullName',
                            });
                        }
                    }
                });
            } else {
                const Uuser: User = {
                    isAuthenticated: false, 
                    uid: "",
                    email: "",
                    fullName: "",
                    userName: "",
                    photoURL: "",
                    authenticatedFrom: {
                        providerId: "",
                        provider: "",
                    }
                }
                setUser(Uuser);
            }
           
        });
    }, []);
    
    const signUpUser = (email: string, password: string, user_name: string, data: any, action: {
        onSuccess: () => void,
        onError: (error: any) => void
    }) => {
        setLoading(true);
        return u_createUserWithEmailAndPassword(email, password, user_name)
            .then((userResult) => {
                try {
                    const uuser = auth.currentUser;
                    u_updateProfile(uuser, { displayName: user_name });
                    u_addUser(uuser?.uid, data);
                    u_addUserName(user_name);
                    setLoading(false);
                    setError("");
                    setHasError(false);
                    action.onSuccess();
                    if (isBrowser()) {
                        sessionStorage.setItem('auth_instance', JSON.stringify(false));
                    }
                        
                }
                catch (error: any) {
                    setLoading(false);
                    setError("an error occured");
                    setHasError(true);
                    action.onError(error.code);
                }

            })
            .catch((error) => {
                setError(error.code);
                setHasError(true);
                setLoading(false);
                action.onError(error.code);
            });
    };
    
    const signInUser = (email: string, password: string, action: {
        onSuccess: () => void,
        onError: (error: any) => void
    }) => {
        setLoading(true);
        return u_signInWithEmailAndPassword(email, password)
            .then((result) => {
                action.onSuccess();
            })
            .catch((error) => { 
                setError(error.code);
                setHasError(true);
                setLoading(false);
                action.onError(error.code);
            });
    };

    const signOutUser = (action: {
        onSuccess: () => void,
        onError: (error: any) => void
    }) => {
        return u_signOut().then(() => {
            if (isBrowser()) {
                sessionStorage.setItem('auth_instance', JSON.stringify(false));
            }
            action.onSuccess();
        }).catch((error: any) => {
            setError(error.code);
            setHasError(true);
            action.onError(error.code);
        });
    };

    const signInWithGitHubUser = (action: {
        onSuccess: () => void,
        onError: (error: any) => void
    }) => {
        setLoading(true);
        return u_signInWithGitHub()
            .then((result) => {
                u_getRedirectResult(auth)
                    .then((result: any) => {
                        const credential = u_GitHubProvider.credentialFromResult(result);
                        if (credential) {
                            const user = result.user;
                            console.log(user);
                            setUser({
                                isAuthenticated: !!user,
                                uid: user.uid,
                                email: user.email,
                                fullName: user.displayName,
                                userName: user.displayName,
                                photoURL: user.photoURL,
                                authenticatedFrom: {
                                    providerId: user.providerData[0].uid,
                                    provider: user.providerData[0].providerId.split('.com')[0],
                                }
                            })
                        }
                        action.onSuccess();
                    })
                    .catch((error) => {
                        setError(error.code);
                        setHasError(true);
                        setLoading(false);
                        action.onError(error.code);
                    });
            })
            .catch((error) => {
                setError(error.code);
                setHasError(true);
                setLoading(false);
                action.onError(error.code);
            });
    };
    
    const addUserName = (username: string) => {
        try {
            return u_addUserName(username);
        } catch (error: any) {
            setError("unable to add user name");
            setHasError(true);
        }
    };

    const getUserName = (user: User) => {
        try {
            return u_getUserName(user.uid);
        } catch (error: any) {
            setError("unable to get user name");
            setHasError(true);
        }
    };

    const deleteUserName = (user: User) => {
        try {
            return u_deleteUserName(user.uid);
        } catch (error: any) {
            setError("unable to delete user name");
            setHasError(true);
        }
    };

    const getUserNames = () => {
        try {
            let usernames: any = [];
            return u_getUserNames().then((snapshot: any) => {
                snapshot.docs.forEach((doc: any) => {
                    usernames.push(doc.data());
                });
            }).then(() => {
                return usernames;
            });
        } catch (error: any) {
            setError("unable to get user names");
            setHasError(true);
        }
    };


    const addUser = (user: User, data: any) => {
        try {
            return u_addUser(user.uid, data);
        } catch (error: any) {
            setError("unable to add user");
            setHasError(true);
        }
        
    };

    const getUser = (user: User) => {
        try {
            return u_getUser(user.uid);
        } catch (error: any) {
            setError("unable to get user");
            setHasError(true);
        }
    };

    const updateUser = (user: User, data: any) => {
        try {
            return u_updateUser(user.uid, data);
        } catch (error: any) {
            setError("unable to update user");
            setHasError(true);
        }
    };

    const deleteUser = (user: User) => {
        try {
            return u_deleteUser(user.uid);
        } catch (error: any) {
            setError("unable to delete user");
            setHasError(true);
        }
    };

    const getUsers = () => {
        try {
            return u_getUsers();
        } catch (error: any) {
            setError("unable to get users");
            setHasError(true);
        }
    };

    

    const context: UserContext | any = {
        user,
        loading,
        error,
        hasError,
        signUpUser,
        signInUser,
        signOutUser,
        signInWithGitHubUser,
        addUserName,
        getUserName,
        deleteUserName,
        getUserNames,
        addUser,
        getUser,
        updateUser,
        deleteUser,
        getUsers,
    };

    return <userContext.Provider value={context} >{children}</userContext.Provider>;
};

