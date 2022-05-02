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
    u_addPost,
} from "../config/auth/user";
import { AuthUser, Space, User, UserContext } from "../interface/User";

import {createDate, isBrowser, print} from "../utils";

const userContext = createContext({} as UserContext<User>);

export default function useUserContext() {
    return useContext(userContext);
}

const setCreatedAt = () => {
    const now = createDate();
    return now;
};

export const UserProvider = ({ children }: any) => {
    const [authUser, setAuthUser] = useState({
        isAuthenticated: null, // set to null to indicate loading of user becuase at initial load, user is null
        uid: "",
        email: "",
        displayName: "",
        userName: "",
        profileImage: null,
        authenticatedFrom: {
            providerId: "",
            provider: "",
        },
    } as AuthUser);
    const [user, setUser] = useState({
        uid: "",
        email: "",
        displayName: "",
        userName: "",
        profileImage: null,
        blocked: false,
        premium: false,
        verified: false,
        bio: null,
        followers: [],
        following: [],
        spaces: [],
        followersCount: 0,
        followingsCount: 0,
        spacesCount: 0,
        createdAt: "",
        updatedAt: "",
    } as User);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasError, setHasError] = useState(error ? error !== "" : false);
    useEffect(() => {
        return getCurrentUser((uuser: any) => {
            if (uuser) {
                const Uuser: AuthUser = {
                    isAuthenticated: !!uuser, 
                    uid: uuser.uid,
                    email: uuser.email,
                    displayName: uuser.displayName,
                    userName: uuser.displayName,
                    profileImage: uuser.photoURL,
                    authenticatedFrom: {
                        providerId: uuser.providerData[0].uid,
                        provider: uuser.providerData[0].providerId.split('.com')[0],
                    },
                }
                setAuthUser(Uuser);
                const userDoc = u_getUser(uuser.uid);
                userDoc.then((doc: any) => {
                    if (doc.exists && doc.data() !== undefined) {
                        const data = doc.data();
                        const user: User = {
                            uid: uuser.uid,
                            email: data.email,
                            displayName: data.displayName,
                            userName: data.userName,
                            profileImage: data.profileImage,
                            blocked: data.blocked,
                            premium: data.premium,
                            verified: data.verified,
                            bio: data.bio,
                            followers: data.followers,
                            following: data.following,
                            spaces: data.spaces,
                            followersCount: data.followersCount,
                            followingsCount: data.followingsCount,
                            spacesCount: data.spacesCount,
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt,
                        }
                        setUser(user);
                    } else {
                        const user: User = {
                            uid: uuser.uid,
                            email: uuser.email,
                            displayName: uuser.displayName,
                            userName: uuser.displayName,
                            profileImage: uuser.photoURL,
                            blocked: false,
                            premium: false,
                            verified: false,
                            bio: null,
                            followers: [],
                            following: [],
                            spaces: [],
                            followersCount: 0,
                            followingsCount: 0,
                            spacesCount: 0,
                            createdAt: '',
                            updatedAt: '',
                        }
                        setUser(user);
                    }
                });
            } else {
                const Uuser: AuthUser = {
                    isAuthenticated: false, 
                    uid: "",
                    email: "",
                    displayName: "",
                    userName: "",
                    profileImage: null,
                    authenticatedFrom: {
                        providerId: "",
                        provider: "",
                    }
                }
                setAuthUser(Uuser);
            }
           
        });
    }, []);
    
    const signUpUser = (email: string, password: string, data: User, action: {
        onSuccess: () => void,
        onError: (error: any) => void
    }) => {
        setLoading(true);
        return u_createUserWithEmailAndPassword(email, password)
            .then((userResult) => {
                try {
                    u_updateProfile(userResult.user, { displayName: data.displayName });
                    u_addUser(userResult.user.uid, {
                        uid: userResult.user.uid,
                        email: userResult.user.email,
                        displayName: data.displayName,
                        userName: data.userName,
                        profileImage: data.profileImage,
                        blocked: data.blocked,
                        premium: data.premium,
                        verified: data.verified,
                        bio: data.bio,
                        followers: data.followers,
                        following: data.following,
                        spaces: data.spaces,
                        followersCount: data.followersCount,
                        followingsCount: data.followingsCount,
                        spacesCount: data.spacesCount,
                        createdAt: setCreatedAt(),
                        updatedAt: setCreatedAt(),
                    });
                    u_addUserName(data.userName);
                    setLoading(false);
                    setError("");
                    setHasError(false);
                    action.onSuccess();
                        
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
                            setAuthUser({
                                isAuthenticated: !!user,
                                uid: user.uid,
                                email: user.email,
                                displayName: user.displayName,
                                userName: user.displayName,
                                profileImage: user.photoURL,
                                authenticatedFrom: {
                                    providerId: user.providerData[0].uid,
                                    provider: user.providerData[0].providerId.split('.com')[0],
                                },
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

    const getUsers = (id: any) => {
        try {
            return u_getUsers(id);
        } catch (error: any) {
            setError("unable to get users");
            setHasError(true);
        }
    };

    const addSpace = (uid: string, post: Space, cb: (message: any) => void) => {
        try {
            u_addPost(uid, post).then((result: any) => {
                if (result) {
                    cb(result);
                }
            }).catch((error: any) => {
                setError("An error occured");
                setHasError(true);
            });
        } catch (error: any) {
            setError("An error occured");
            setHasError(true);
        }
    };

    const context: UserContext<any> | any = {
        authUser,
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
        addSpace,
    };

    return <userContext.Provider value={context} >{children}</userContext.Provider>;
};

