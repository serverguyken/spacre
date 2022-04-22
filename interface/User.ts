export interface Post {
    postId: string;
    userId: string;
    userName: string;
    userProfileImage: string;
    postImage: string;
    postText: string;
    postLikes: Array<string>;
    postComments: Array<string>;
    postBoosts: Array<string>;
    postShares: Array<string>;
    postTags: Array<string>;
    postCreatedAt: string;
    postUpdatedAt: string;
    postDeletedAt: string;
    postIsDeleted: boolean;
    postIsBoosted: boolean;
    postIsLiked: boolean;
    postIsShared: boolean;
    postIsCommented: boolean;
    postIsReported: boolean;
    postIsSaved: boolean;
}

export interface AuthUser {
    isAuthenticated: boolean | null;
    uid: string;
    email: string | null;
    fullName: string | null;
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
    fullName: string;
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



export interface UserContext<T> {
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
    getUsers: () => Promise<T>;
}