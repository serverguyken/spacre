export interface Post {
    postId: string;
    userId: string;
    userName: string;
    userProfileImage: string;
    images: string;
    content: string;
    hasPoll: boolean;
    poll: Poll;
    likes: Array<string>;
    comments: Array<string>;
    boosts: Array<string>;
    shares: Array<string>;
    tags: Array<string>;
    isLiked: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    isDeleted: boolean;
    isBoosted: boolean;
    isReported: boolean;
    isSaved: boolean;
}

export interface Poll {
    id: number;
    question: string;
    options: PollOption[];
    expiresAt: string;
    createdAt: string;
}

export interface PollOption {
    id: number;
    option: string;
    votes: number;
}
export interface Reply extends Post {
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
    posts: Post[];
    savedPosts: Array<any>;
    notifications: Array<any>;
    blockedUsers: Array<any>;
    boostedPosts: Array<any>;
    recentSearches: Array<any>;
}

export interface DBUsers {
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
    getUser: () => Promise<void>;
    updateUser: (user: User) => Promise<void>;
    deleteUser: () => Promise<void>;
    getUsers: (id: any) => Promise<GetUsers<Object>>;
}