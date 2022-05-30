import { Meta } from "./Meta";

export interface Space {
    user: User;
    spaceId: string;
    userId: string;
    userName: string;
    displayName: string
    userProfileImage: string | null;
    images: Array<any> | any;
    videos: Array<any> | any;
    meta: Meta;
    text: string;
    hasPoll: boolean;
    poll: Poll;
    likes: Array<string>;
    comments: Array<string>;
    boosts: Array<string>;
    shares: Array<string>;
    tags: Array<string>;
    liked: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    deleted: boolean;
    boosted: boolean;
    reported: boolean;
    saved: boolean;
}

export interface Poll {
    question: string;
    options: PollOption[];
    expiresAt: {
        date: string;
        type: string;
        unit: string;
    };
    createdAt: string;
}

export interface PollOption {
    id: number;
    option: string;
    votes: number;
}
export interface Reply extends Space {
    replyId: string;
}

export interface AuthUser {
    isAuthenticated: boolean | null;
    uid: string;
    email: string | null;
    displayName: string | null;
    userName: string | null;
    profileImage: string | null;
    authenticatedFrom: {
        providerId: string;
        provider: string;
    };
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    userName: string;
    profileImage: string | null;
    blocked: boolean;
    premium: boolean;
    verified: boolean;
    bio: string | null;
    followers: Array<any>;
    following: Array<any>;
    spaces: Array<any>;
    followersCount: number;
    followingsCount: number;
    spacesCount: number;
    createdAt: string | null;
    updatedAt: string | null;
}
export interface UserData {
    uid: string;
    email: string;
    displayName: string;
    userName: string;
    profileImage: string | null;
    isBlocked: boolean;
    isPremium: boolean;
    isVerified: boolean;
    bio: string | null;
    followers: Array<any>;
    following: Array<any>;
    spaces: Array<any>;
    followersCount: number;
    followingsCount: number;
    spacesCount: number;
    Spaces: Space[];
    savedSpaces: Array<any>;
    notifications: Array<any>;
    blockedUsers: Array<any>;
    boostedSpaces: Array<any>;
    recentSearches: Array<any>;
}

export interface DBUsers {
    users: {
        [uid: string]: User;
    };
    hashTags: {
        [hashTag: string]: Array<string>;
    };
    Spaces: {
        [SpaceId: string]: Space;
    };
}

export interface GetUsers<T> {
    users: User[];
    status: T
}


export interface UserContext<User> {
    authUser: AuthUser;
    user: User;
    loading: boolean;
    error: string;
    hasError: boolean;
    signUpUser: (email: string, password: string, data: any, action: {
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
    getUser: (id: string, cb:(user: User) => void) => User;
    updateUser: (user: User) => Promise<void>;
    deleteUser: () => Promise<void>;
    getUsers: (id: any) => Promise<GetUsers<Object>>;
    addSpace: (id: any, Space: Space,  cbs: {
        onSuccess: (result: any) => void, onError: (result: any) => void
    }) => Promise<void>;
    getSpaces: (id: any, limit: number, callback: (result: any) => void) => Promise<void>;
}