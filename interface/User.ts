import { Meta } from "./Meta";
export interface Search {
    bio: string
    content: string
    id: string
    link: string
    profileImage: string
    type: string
    userName: string
    verified: boolean
}
export type Constructor = {
    userId: string;
}
export interface Likes {
    userId: Constructor["userId"];
}
export interface Space {
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
    likes: Array<Likes>;
    replies: Reply[];
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
// extend Space but without spaceId
export interface Reply extends Omit<Space, "spaceId"> {
    // chenge spaceId to replyId
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
    bannerImage: string | null;
    blocked: boolean;
    premium: boolean;
    verified: boolean;
    bio: string | null;
    followers: Array<Constructor>;
    following: Array<Constructor>;
    spaces: Array<any>;
    followersCount: number;
    followingsCount: number;
    spacesCount: number;
    createdAt: string | null;
    updatedAt: string | null;
    saves: Array<{
        spaceId: string;
    }>;
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
    getUser: (id: any, cbs: {
        onSuccess: (result: any) => void, onError: (result: any) => void
    }) => void;
    updateUser: (id: any, user: User, cbs: {
        onSuccess: (result: any) => void, onError: (result: any) => void
    }) => void;
    deleteUser: () => Promise<void>;
    getUsers: (id: any, cbs: {
        onSuccess: (result: any) => void, onError: (result: any) => void
    }) => void;
    getUsersFomClient: (id: any, cbs: {
        onSuccess: (result: any) => void, onError: (result: any) => void
    }) => void;
    addSpace: (id: any, Space: Space, cbs: {
        onSuccess: (result: any) => void, onError: (result: any) => void
    }) => Promise<void>;
    updateSpace: (id: any, Space: Space, cbs: {
        onSuccess: (result: any) => void, onError: (result: any) => void
    }) => void;
    deleteSpace: (id: any, cbs: {
        onSuccess: (result: any) => void, onError: (result: any) => void
    }) => Promise<void>;
    getSpace: (id: any, cbs: {
        onSuccess: (result: any) => void, onError: (result: any) => void
    }) => void;
    getSpaces: (id: any, limit: number, callback: (spaces: Space[]) => void) => void;
}