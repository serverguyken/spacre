import type { NextPage } from 'next'
import {print} from '../../utils'
import { Spinner, LineLoader, LineLoaderDark } from '../../utils/loader'
import { PrimaryButton, SecondaryButton } from '../../components/Buttons'
import { useState, useEffect } from 'react'
import Modal from '../../components/Modal'
import {  Group } from '@mantine/core';
import { useRouter } from 'next/router'
import { generateUsername, isBrowser } from '../../utils'
import Auth from '../../auth/index'
import Icon from '../../components/Icon'
import { setClass } from '../../utils'
import styles from '../../styles/Auth.module.css'
import Input from '../../components/Input'
import validate from '../../utils/validate'
import { Alert } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';
import Link from 'next/link'
import useUserContext from '../../provider/userProvider'
import errors from '../../config/auth/errors'

const Signup: NextPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [opened, setOpened] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    let [usernameValue, setUsernameValue] = useState(generateUsername())
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [usernameInvalid, setUsernameInvalid] = useState(false)
    const [emailInvalid, setEmailInvalid] = useState(true)
    const [passwordInvalid, setPasswordInvalid] = useState(true)
    const [showEmailError, setShowEmailError] = useState(false)
    const [showPasswordError, setShowPasswordError] = useState(false)
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [signupError, setSignupError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [spinner, setSpinner] = useState(false)
    const { addUserName, getUserNames, signUpUser, error, hasError } = useUserContext();
    function SetLoading(loading: boolean) {
        setTimeout(() => {
            setLoading(loading)
        }, 1300)
    }
    SetLoading(false)

    function setFocus() {
        if (isBrowser()) {
            window.onload = () => {
                setTimeout(() => {
                    const usernameInput = document.getElementById('username_signup')
                    usernameInput?.focus()
                }, 1300)
            }
        }
    }

    setFocus()


    function redirectOnClose() {
        setSignupError(false)
        if (isBrowser()) {
            router.push('/')
        }
    }
    function togglePassword() {
        setShowPassword(!showPassword)
    }
    function handleUsernameChange(value: any) {
        if (value == "") {
            setUsernameInvalid(true)
            setUsernameErrorMessage('Username is required')
        } else {
            let hasError: any = validate('username', value)
            setUsernameInvalid(hasError.hasError)
            setUsernameErrorMessage(hasError.message)
            if (!hasError.hasError) {
                setUsernameValue(value)
                setUsernameValue(value)
                checkUserName(value)
            }
        }
    }

    function handleEmailInputChange(value: any) {
        if (value == "") {
            setShowEmailError(true)
            setEmailInvalid(true)
            setEmailErrorMessage('Email is required')
        } else {
            let hasError: any = validate('email', value)
            setShowEmailError(hasError.hasError)
            setEmailInvalid(hasError.hasError)
            setEmailErrorMessage(hasError.message)
            setEmailValue(value)
        }
    }

    function handlePasswordInputChange(value: any) {
        if (value == "") {
            setShowPasswordError(true)
            setPasswordInvalid(true)
            setPasswordErrorMessage('Password is required')
        } else {
            let hasError: any = validate('password', value)
            setShowPasswordError(hasError.hasError)
            setPasswordInvalid(hasError.hasError)
            setPasswordErrorMessage(hasError.message)
            setPasswordValue(value)
        }
    }
    
    function checkUserName(value: string) {
        getUserNames().then((userNames: any) => {
            const userName = userNames.find((userName: any) => userName.name === value)
            if (userName) {
                setUsernameInvalid(true)
                setUsernameErrorMessage('Username is already taken')
            } else {
                setUsernameInvalid(false)
                setUsernameErrorMessage('')
            }
        })
    }
    
    useEffect(() => {
        if (!usernameInvalid && !emailInvalid && !passwordInvalid) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [usernameInvalid, emailInvalid, passwordInvalid])


    useEffect(() => {
        if (hasError) {
            setSignupError(true)
            setErrorMessage(errors[error] ? errors[error].message : 'An error occured')
        } else {
            setSignupError(false)
            setErrorMessage('')
        }
    }, [hasError, error])


    function redirectOnSuccess() {
        if (isBrowser()) {
            router.push('/home')
        }
    }


    function handleSignup() {
        if (usernameValue === "") {
            handleUsernameChange('')
        }
        if (emailValue === "") {
            handleEmailInputChange('')
        }
        if (passwordValue === "") {
            handlePasswordInputChange('')
        }
        
        if (!usernameInvalid && !emailInvalid && !passwordInvalid) {
            const data = {
                username: usernameValue,
                email: emailValue,
            }
            signUpUser(emailValue, passwordValue, usernameValue, data, {
                onSuccess: () => {
                    setSpinner(true)
                    setTimeout(() => {
                        setSpinner(false)
                        redirectOnSuccess()
                    }, 1000)
                },
                onError: (error: string) => {
                    setSpinner(false)
                    setSignupError(true)
                    setErrorMessage(errors[error] ? errors[error].message : 'An error occured')
                }
            })
        }
        
    }
            
    return (
        <div>
            {
                loading
                    ?
                    <div className='flex justify-center items-center h-screen'>
                        <Group position='center'>
                            <Spinner color='var(--color-primary)' width={'30'} />
                        </Group>
                    </div>
                    :
                    <div className={setClass(styles.signup_main_container)} >
                        <Auth />
                        <Modal
                            opened={opened}
                            onClose={() => redirectOnClose()}
                            styles={{
                                icon: {
                                    placement: "right"
                                }
                            }}
                        >
                            

                            <div className={setClass(styles.signup_main)}>
                                <div className={setClass(styles.signup_logo)}>
                                    <Group position='center'>
                                        <Icon type="logo" color='' width='40' height='40' />
                                    </Group>
                                </div>
                                <div className={setClass(styles.signup_form_main)}>
                                    <div className={setClass(styles.signup_form_main_top, "overflow-auto")}>
                                        <div className={setClass(styles.signup_header)}>
                                            <h1>Create an account</h1>
                                        </div>
                                        <div className={setClass(styles.signup_form, "mt-4")}>
                                        <Input id="username_signup" styleToRender='default' type="text" hasLabel={false} placeholder='Username' styles={'dark:border-gray-50 dark:border-opacity-20"'} value={usernameValue} invalid={usernameInvalid} onChange={(v) => { handleUsernameChange(v) }} />
                                            < div className = { setClass(styles.signup_email_error)}>
                                        <p className={setClass(styles.signup_email_error_text, "text-red-500 mt-2 text-xs")}>{usernameErrorMessage}</p>
                                    </div>
                                    <Input id="email_signup" styleToRender='default' type="text" hasLabel={false} placeholder='Email' value={emailValue} invalid={emailInvalid && showEmailError} onChange={(v) => { handleEmailInputChange(v) }} />
                                    <div className={setClass(styles.signup_email_error)}>
                                        <p className={setClass(styles.signup_email_error_text, "text-red-500 mt-2 text-xs")}>{emailErrorMessage}</p>
                                    </div>
                                            <Input id="password_signup" styleToRender='default' type="password" hasLabel={false} placeholder='Password' value={passwordValue} invalid={passwordInvalid && showPasswordError} showPassword={showPassword} togglePassword={togglePassword} onChange={(v) => { handlePasswordInputChange(v) }} />
                                            <div className={setClass(styles.signup_email_error)}>
                                                <p className={setClass(styles.signup_email_error_text, "text-xs mt-2 text-gray-500")}>{!passwordInvalid ? 
                                                "Password with 6 or more characters": null}</p>
                                        <p className={setClass(styles.signup_email_error_text, "text-red-500 mt-2 text-xs")}>{passwordErrorMessage}</p>
                                    </div>
                                        </div>
                                    </div>
                                    <div className={setClass(styles.signup_form_main_bottom)}>
                                        <div className={setClass(styles.signup_form_button, "mt-4")}>
                                            {
                                                spinner ?

                                                    <PrimaryButton  width={"w-full py-3"} disabled={disabled} textColor="white">
                                                        <Spinner color='white' width={'20'} />
                                                    </PrimaryButton>
                                                    :

                                                    <PrimaryButton text="Sign Up" width={"w-full py-3"} disabled={disabled} textColor="white" action={handleSignup} />
                                             }
                                        </div>
                                        <div className={setClass(styles.side_right_bottom)}>
                                            <div className={setClass("signup_legal")}>
                                                <p className={setClass("text-xs mt-5 w-9/12 text-center m-auto")}>By signing up, you agree to the <span className={setClass("text-primary underline")}><Link href="/legal/terms">Terms of Service</Link></span> and <span className={setClass("text-primary underline")}><Link href="/legal/privacy">Privacy Policy</Link></span>.</p>
                                            </div>
                                            <div className={setClass(styles.alr_login)}>
                                                <p className={setClass("text-sm mt-5 w-8/12 text-center m-auto")}>Already have an account? <span className={setClass("text-primary underline")}><Link href="/auth/login">Log in</Link></span></p>
                                            </div>
                                        </div>
                                    </div>
                                    {signupError ? <div className={setClass(styles.signup_error, 'mt-5')}>
                                        <Alert icon={<AlertCircle size={16} />} title="Error" color="red">
                                            {errorMessage}
                                        </Alert>
                                        
                                    </div>: null}
                                </div>
                            </div>
                        </Modal>
                    </div>
            }
        </div>
    );
}

export default Signup

export async function getStaticProps() {
    const data = false
    return {
        props: {
            data: data
        }
    }
}