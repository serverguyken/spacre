export interface User {
    isAuthenticated: boolean | null;
    uid: string;
    email: string | null;
    fullName: string | null;
    userName: string | null;
    photoURL: string | null;
    authenticatedFrom: {
        providerId: string;
        provider: string;
    }
}

// export interface User {
//     isAuthenticated: boolean | null;
//     uid: string;
//     email: string | null;
//     fullName: string | null;
//     userName: string | null;
//     photoURL: string | null;
//     authenticatedFrom: {
//         providerId: string;
//         provider: string;
//     };
//    isBlocked: boolean;
//    isPremium: boolean;
//    isVerified: boolean;
//    bio: Array<any>;
//    followers: Array<any>;
//    following: Array<any>;
//    posts: Array<any>;
//    comments: Array<any>;
//    likes: Array<any>;
//    savedPosts: Array<any>;
//    notifications: Array<any>;
//    blockedUsers: Array<any>;
//    boostedPosts: Array<any>;
//    recentSearches: Array<any>;
// }

export interface DBUser {
    users: {
        [uid: string]: User;
    };
    hashTags: {
        [hashTag: string]: Array<string>;
    };
    posts: {
        [postId: string]: Post;
    };
}

export interface Post {
    postId: string;
    userId: string;
    userName: string;
    userPhotoURL: string;
    postContent: any;
}

export interface UserContext {
    user: User;
    loading: boolean;
    error: string;
    hasError: boolean;
    signUpUser: (email: string, password: string, user_name: string, data: any, action: {
        onSuccess: () => void;
        onError: (error: string) => void;
    }) => Promise<void>;
    signInUser: (email: string, password: string, action: {
        onSuccess: (user: any) => void;
        onError: (error: string) => void;
    }) => Promise<void>;
    signOutUser: (action: {
        onSuccess: () => void;
        onError: (error: string) => void;
    }) => void;
    signInWithGitHubUser: (action: {
        onSuccess: () => void;
        onError: (error: string) => void;
    }) => Promise<void>;
    addUserName: (user_name: string) => Promise<void>;
    getUserName: () => Promise<void>;
    deleteUserName: () => Promise<void>;
    getUserNames: () => Promise<void>;
    addUser: (user: User) => Promise<void>;
    getUser: () => Promise<void>;
    updateUser: (user: User) => Promise<void>;
    deleteUser: () => Promise<void>;
    getUsers: () => Promise<void>;
}