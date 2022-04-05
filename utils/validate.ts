export function validateUsername(username: string): {
    message: string;
    hasError: boolean;
} {
    const errors: { message: string, hasError: boolean } = {
        message: '',
        hasError: false
    }
    if (!username) {
        errors.message = 'username is required'
        errors.hasError = true
    }
    if (username && username.length < 3 || username.length > 20) {
        errors.message = 'Username must be between 3 and 20 characters'
        errors.hasError = true
    }
    return errors
}

export function validateEmail(email: string): {
    message: string;
    hasError: boolean;
} {
    const errors: { message: string, hasError: boolean} = {
        message: '',
        hasError: false
    }
    if (!email) {
        errors.message = 'Email is required'
        errors.hasError = true
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors.message = 'Invalid email address'
        errors.hasError = true
    }
    return errors
}
export function validatePassword(password: string): {
    message: string;
    hasError: boolean;
} {
    const errors: { message: string, hasError: boolean} = {
        message: '',
        hasError: false
    }
    if (!password) {
        errors.message = 'Password is required'
        errors.hasError = true
    }
    if (password && password.length < 6) {
        errors.message = 'Password must be at least 6 characters'
        errors.hasError = true
    }
    return errors
}




export default function validate(type: string, value: string): {} {
    switch (type) {
        case 'username':
            return validateUsername(value)
        case 'email':
            return validateEmail(value)
        case 'password':
            return validatePassword(value)
        default:
            return { }
    }
}