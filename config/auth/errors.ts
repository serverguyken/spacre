const errors: { [key: string]: { [key: string]: string } } = {
    'auth/too-many-requests': {
        message: 'Too many request.',
    },
    'auth/unauthorized-domain': {
        message: 'This domain is not authorized for OAuth operations.',
    },
    'auth/invalid-email': {
        message: 'The email address is invalid.',
    },
    'auth/user-not-found': {
        message: 'The user account does not exist. Please check the email address and try again.',
    },
    'auth/wrong-password': {
        message: 'The password is invalid.',
    },
    'auth/email-already-in-use': {
        message: 'The email address is already in use by another account.',
    },
    'auth/weak-password': {
        message: 'The password is too weak.',
    },
    'auth/user-disabled': {
        message: 'Your account has been disabled. Please contact support.',
    },
    '': {
        message: 'An unknown error occurred.',
    },
    undefined: {
        message: 'An unknown error occurred.',
    },
}


export default errors;