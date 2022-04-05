import type { NextPage } from 'next'
import { print } from '../../utils'
import { Spinner, LineLoader, LineLoaderDark } from '../../utils/loader'
import { PrimaryButton, SecondaryButton, SocialButton } from '../../components/Buttons'
import { useState, useEffect } from 'react'
import Modal from '../../components/Modal'
import {  Group } from '@mantine/core';
import { useRouter } from 'next/router'
import { isBrowser } from '../../utils'
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











const Login: NextPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [opened, setOpened] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [emailInvalid, setEmailInvalid] = useState(true)
    const [passwordInvalid, setPasswordInvalid] = useState(true)
    const [showEmailError, setShowEmailError] = useState(false)
    const [showPasswordError, setShowPasswordError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [spinner, setSpinner] = useState(false)
    const { signInUser, signInWithGitHubUser, error, hasError } = useUserContext();
    
    
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
                    const email_username = document.getElementById('email_username_login')
                    email_username?.focus()
                }, 1300)
            }
        }
    }

    setFocus()


    function redirectOnClose() {
        setLoginError(false)
        if (isBrowser()) {
            router.push('/')
        }
    }
    function togglePassword() {
        setShowPassword(!showPassword)
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
            setShowPasswordError(false)
            setPasswordInvalid(false)
            setPasswordErrorMessage('')
            setPasswordValue(value)
        }
    }


    useEffect(() => {
        if (!emailInvalid && !passwordInvalid) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [emailInvalid, passwordInvalid])

   
    

    function redirectOnSuccess() {
        if (isBrowser()) {
            router.push('/home')
        }
    }


    function handleLogin() {
        if (emailValue === "") {
            handleEmailInputChange('')
        }
        if (passwordValue === "") {
            handlePasswordInputChange('')
        }

        if (!emailInvalid && !passwordInvalid) {
            setSpinner(true)
            signInUser(emailValue, passwordValue, {
                onSuccess: (user: any) => {
                    print('user', user)
                    setTimeout(() => {
                        redirectOnSuccess()
                        setSpinner(false)
                    }, 1000)
                },
                onError: (error: string) => {
                    setTimeout(() => {
                        setSpinner(false)
                        setLoginError(true)
                        setErrorMessage(errors[error] ? errors[error].message : 'An error occured')
                    }, 1000)
                }
            })
        }

    }

    function handleGitHubLogin() { 
        setLoading(true)
        signInWithGitHubUser({
            onSuccess: () => {
                setTimeout(() => {
                    redirectOnSuccess()
                }, 1000)
            },
            onError: (error: string) => {
                setTimeout(() => {
                    setLoginError(true)
                    setErrorMessage(errors[error] ? errors[error].message : 'An error occured')
                }, 1000)
            }
        })
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
                            <div className='absolute top-6 right-3 px-2 py-1 hover:bg-gray-100 rounded-sm'>
                            </div>
                            <div className={setClass(styles.signup_main)}>
                                <div className={setClass(styles.signup_logo)}>
                                    <Group position='center'>
                                        <Icon type="logo" color='' width='40' height='40' />
                                    </Group>
                                </div>
                                <div className={setClass(styles.signup_form_main)}>
                                    <div className={setClass(styles.signup_form_main_top, "overflow-auto")}>
                                        <div className={setClass(styles.signup_header)}>
                                            <h1>Welcome back!</h1>
                                        </div>
                                        <div className={setClass(styles.signup_form, "mt-4")}>
                                            
                                            <Input id="email_username_login" styleToRender='default' type="text" hasLabel={false} placeholder='Email' value={emailValue} invalid={emailInvalid && showEmailError} onChange={(v) => { handleEmailInputChange(v) }} />
                                            <div className={setClass(styles.signup_email_error)}>
                                                <p className={setClass(styles.signup_email_error_text, "text-red-500 mt-2 text-xs")}>{emailErrorMessage}</p>
                                            </div>
                                            <Input id="password_login" styleToRender='default' type="password" hasLabel={false} placeholder='Password' value={passwordValue} invalid={passwordInvalid && showPasswordError} showPassword={showPassword} togglePassword={togglePassword} onChange={(v) => { handlePasswordInputChange(v) }} />
                                            <div className={setClass(styles.signup_email_error)}>
                                                <p className={setClass(styles.signup_email_error_text, "text-red-500 mt-2 text-xs")}>{passwordErrorMessage}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={setClass(styles.signup_form_main_bottom)}>
                                        <div className={setClass(styles.signup_form_button, "mt-4")}>
                                            {
                                                spinner ?

                                                    <PrimaryButton width={"w-full py-3"} disabled={disabled} textColor="white">
                                                        <Spinner color='white' width={'20'} />
                                                    </PrimaryButton>
                                                    :

                                                    <PrimaryButton text="Log In" width={"w-full py-3"} disabled={disabled} textColor="white" action={handleLogin} />
                                            }
                                        </div>


                                        <div className={setClass(styles.or_opt_ele, 'after:bg-white border-b border-b-gray-200 dark:after:bg-darkMode dark:after:content-["OR"] dark:border-b-gray-200 dark:border-opacity-20')}>
                                        </div>

                                        <SocialButton disabled={false} color="bg-white" text="Continue with Github" styles=" border boder-gray-300" textStyle='text-lg dark:text-dark' width="px-16 py-3" icon="github" iconWidth='w-6' action={() => { handleGitHubLogin() }} />
                                        <div className={setClass(styles.side_right_bottom)}>
                                            <div className={setClass("signup_legal")}>
                                                <p className={setClass("text-xs mt-5 w-9/12 text-center m-auto")}>By signing up, you agree to the <span className={setClass("text-primary underline")}><Link href="/legal/terms">Terms of Service</Link></span> and <span className={setClass("text-primary underline")}><Link href="/legal/privacy">Privacy Policy</Link></span>.</p>
                                            </div>
                                            <div className={setClass(styles.alr_login)}>
                                                <p className={setClass("text-sm mt-5 w-8/12 text-center m-auto")}>Don&apos;t have an account? <span className={setClass("text-primary underline")}><Link href="/auth/signup">Sign up</Link></span></p>
                                            </div>
                                        </div>
                                    </div>
                                    {loginError ? <div className={setClass(styles.signup_error, 'mt-5')}>
                                        <Alert icon={<AlertCircle size={16} />} title="Error" color="red">
                                            {errorMessage}
                                        </Alert>

                                    </div> : null}
                                </div>
                            </div>
                        </Modal>
                    </div>
            }
        </div>
    );
}

export default Login

export async function getStaticProps() {
    const data = false
    return {
        props: {
            data: data
        }
    }
}