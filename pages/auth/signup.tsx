import type { NextPage } from 'next'
import { print } from '../../utils'
import { Spinner, LineLoader, LineLoaderDark } from '../../utils/loader'
import { PrimaryButton, SecondaryButton } from '../../components/Buttons'
import { useState, useEffect } from 'react'
import Modal from '../../components/Modal'
import { Group } from '@mantine/core';
import { useRouter } from 'next/router'
import { generateUsername, isBrowser } from '../../utils'
import Auth from '../../auth/index'
import Icon from '../../components/Icon'
import { PhotographIcon } from '@heroicons/react/outline'
import { setClass } from '../../utils'
import styles from '../../styles/Auth.module.css'
import Input from '../../components/Input'
import validate from '../../utils/validate'
import { Alert } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';
import Link from 'next/link'
import useUserContext from '../../provider/userProvider'
import errors from '../../config/auth/errors'
import VALTIO, { SUBSCRIBE } from '../../store/valtio'
import store from '../../store'
import $ from 'dot-cherry'
import Head from 'next/head'
import Image from 'next/image'
const Signup: NextPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [opened, setOpened] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [usernameValue, setUsernameValue] = useState(generateUsername())
    const [nameValue, setNameValue] = useState('')
    const [image, setImage] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [cne_disabled, setCne_disabled] = useState(true)
    const [usn_pst_disabled, setUsn_pst_disabled] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [nameInvalid, setNameInvalid] = useState(false)
    const [usernameInvalid, setUsernameInvalid] = useState(false)
    const [emailInvalid, setEmailInvalid] = useState(true)
    const [passwordInvalid, setPasswordInvalid] = useState(true)
    const [showNameError, setShowNameError] = useState(false)
    const [showEmailError, setShowEmailError] = useState(false)
    const [showPasswordError, setShowPasswordError] = useState(false)
    const [nameErrorMessage, setNameErrorMessage] = useState('')
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [signupError, setSignupError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [spinner, setSpinner] = useState(false)
    const [profilePicture, setProfilePicture] = useState('https://sfsfiles.spacre.com/profile/f5dde43b-a991-43bb-854d-fa41ad9fc4f6_user.png')
    const stepObject = store.get('signup_step')
    const v = generateUsername()
    const generatedUsernames = [
        ''
    ]
    const [step, setStep] = useState({
        step: 1,
        step_name: 'CREATING_NAME_EMAIL',
        skipable: false,
        completed: false,
    })

    const { addUserName, getUserNames, signUpUser, error, hasError, signOutUser } = useUserContext();
    useEffect(() => {
        if (step.step_name === 'CREATING_NAME_EMAIL') {
            if (!nameInvalid && !emailInvalid) {
                setCne_disabled(false)
            } else {
                setCne_disabled(true)
            }
        }
        if (step.step_name === 'USERNAME_PASSWORD_SETUP') {
            
            if (!usernameInvalid && !passwordInvalid) {
                setUsn_pst_disabled(false)
            } else {
                setUsn_pst_disabled(true)
            }
        }
        // if (step.step_name === 'USERNAME_SETUP') { }
        // if (step.step_name === 'PROFILE_PICTURE_SETUP') { }
        // if (hasError) {
        //     setSignupError(true)
        //     setErrorMessage(errors[error] ? errors[error].message : 'An error occured')
        // } else {
        //     setSignupError(false)
        //     setErrorMessage('')
        // }
    }, [step, nameInvalid, emailInvalid, usernameInvalid, passwordInvalid, hasError])

    function SetLoading(loading: boolean) {
        setTimeout(() => {
            setLoading(loading)
        }, 1300)
    }
    SetLoading(false)

    function setFocus() {
        
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

    function handleNameInputChange(value: any) {
        if (value == "") {
            setShowNameError(true)
            setNameInvalid(true)
            setNameErrorMessage('Name is required')
        } else {
            setShowNameError(false)
            setNameInvalid(false)
            setNameErrorMessage('')
            setNameValue(value)
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

    const setNextStep = (_type: string) => {
        $.switch(_type, {
            'CREATING_NAME_EMAIL': () => {
                store.content.data.signup_step = {
                    step: 1,
                    step_name: 'CREATING_NAME_EMAIL',
                    skipable: false,
                    completed: false,
                }
                setStep(store.content.data.signup_step)
            },
            'USERNAME_PASSWORD_SETUP': () => {
                store.content.data.signup_step = {
                    step: 2,
                    step_name: 'USERNAME_PASSWORD_SETUP',
                    skipable: false,
                    completed: false,
                }
                setStep(store.content.data.signup_step)
            },
            default: () => {
            }
        })
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




    function redirectOnSuccess() {
        if (isBrowser()) {
            router.push('/home')
        }
    }


    function handleSignup() {
        setSpinner(true)
        const data = {
                email: emailValue,
                fullName: nameValue,
                userName: usernameValue,
                profileImage: null,
                isBlocked: false,
                isPremium: false,
                isVerified: false,
                bio: null,
                followers: [],
                following: [],
                spaces: [],
                followersCount: 0,
                followingsCount: 0,
                spacesCount: 0,
                posts: [],
                savedPosts: [],
                notifications: [],
                blockedUsers: [],
                boostedPosts: [],
                recentSearches: [],
            }
            signUpUser(emailValue, passwordValue, data, {
                onSuccess: () => {
                    setTimeout(() => {
                        setSpinner(false)
                        redirectOnSuccess()
                    }, 2000)
                },
                onError: (error: string) => {
                    setSpinner(false)
                    setSignupError(true)
                    setErrorMessage(errors[error] ? errors[error].message : 'An error occured')
                }
            })
    }

    return (
        <div>
            <Head>
                <title>Sign up for Spacre</title>
                 <meta content='Sign up for Spacre' property='og:title'/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
                                    placement: "left",
                                    padding: "0px",
                                    className: "-ml-4",
                                    tooltip: {
                                        className: "-ml-4",
                                    }
                                },
                                modal: {
                                },
                            }}
                            showCloseIcon={step.step_name === 'CREATING_NAME_EMAIL' ? true : false}
                        >


                            <div className={setClass(styles.signup_main, 'relative')}>
                                {
                                    step.step_name === 'USERNAME_PASSWORD_SETUP' && <div className="go_back_setup relative screen-xs:-mt-6 bg-white">
                                        <div className="flex items-center space-x-1">
                                            <div className="step_go_back relative -ml-2 min-w-[36px] min-h-[36px] cursor-pointer mt-1 w-auto rounded-full flex justify-center items-center hover:bg-gray-600 hover:bg-opacity-10 hover:transition hover:ease-in-out dark:hover:bg-darkModeBg"
                                                onClick={() => {
                                                    setNextStep('CREATING_NAME_EMAIL')
                                                }}
                                            >
                                                <Icon type="arrow-left" styles='w-4 h-4 text-black' />


                                                <div className="go_back_setup_tooltip absolute top-10 invisible z-20 bg-gray-500 dark:bg-black dark:text-white w-auto p-1 text-center text-[0.65rem] text-white rounded-sm shadow-sm">
                                                    <div className="like_tooltip_content">
                                                        Back
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="step_text">
                                                <h3 className='font-semibold text-lg '>Step <span>{step.step} of 2</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    step.step_name === 'PROFILE_PICTURE_SETUP' && <div className="go_back_setup relative screen-xs:-mt-6 bg-white">
                                        <div className="flex items-center space-x-1">
                                            <div className="step_go_back relative -ml-2 min-w-[36px] min-h-[36px] cursor-pointer mt-1 w-auto rounded-full flex justify-center items-center hover:bg-gray-600 hover:bg-opacity-10 hover:transition hover:ease-in-out dark:hover:bg-darkModeBg"
                                                onClick={() => {
                                                    setNextStep('USERNAME_PASSWORD_SETUP')
                                                }}
                                            >
                                                <Icon type="arrow-left" styles='w-4 h-4 text-black' />


                                                <div className="go_back_setup_tooltip absolute top-10 invisible z-20 bg-gray-500 dark:bg-black dark:text-white w-auto p-1 text-center text-[0.65rem] text-white rounded-sm shadow-sm">
                                                    <div className="like_tooltip_content">
                                                        Back
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="step_text">
                                                <h3 className='font-semibold text-lg '>Step <span>{step.step} of 3</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className={setClass(styles.signup_logo)}>
                                    {
                                        step.step_name === 'CREATING_NAME_EMAIL' && <div className='mt-4'>
                                            <Group position='center'>
                                                <Icon type="logo" color='' width='40' height='40' />
                                            </Group>
                                        </div>
                                    }
                                </div>
                                <div className={setClass(styles.signup_form_main, 'mt-8')}>
                                    <div className={setClass(styles.signup_form_main_top, "overflow-auto")}>
                                        <div className={setClass(styles.signup_form)}>
                                            {
                                                step.step_name === "CREATING_NAME_EMAIL" && <div id="name_email_setup">
                                                    <div className={setClass(styles.signup_header, "mb-4")}>
                                                        <h1>Let&apos;s create your account</h1>
                                                    </div>
                                                    <Input id="name_signup" styleToRender='default' type="text" hasLabel={false} placeholder='Name' value={nameValue} invalid={nameInvalid && showNameError} onChange={(v) => { handleNameInputChange(v) }} />
                                                    <div className={setClass(styles.signup_name_error)}>
                                                        <p className={setClass(styles.signup_name_error_text, "text-red-500 mt-2 text-xs")}>{nameErrorMessage}</p>
                                                    </div>
                                                    <Input id="email_signup" styleToRender='email' type="email" hasLabel={false} placeholder='Email' value={emailValue} invalid={emailInvalid && showEmailError} onChange={(v) => { handleEmailInputChange(v) }} />
                                                    <div className={setClass(styles.signup_email_error)}>
                                                        <p className={setClass(styles.signup_email_error_text, "text-red-500 mt-2 text-xs")}>{emailErrorMessage}</p>
                                                    </div>
                                                    <div className="mt-4">
                                                        <PrimaryButton text="Next" width={"w-full py-3"} disabled={cne_disabled} textColor="white" action={() => {
                                                            setNextStep('USERNAME_PASSWORD_SETUP')
                                                        }} />
                                                    </div>
                                                </div>
                                            }
                                            {
                                                step.step_name === "USERNAME_PASSWORD_SETUP" && <div id="username_password_setup">
                                                    <div className={setClass(styles.signup_step, "mb-1")}>
                                                        <h1 className='font-semibold text-lg'>Choose your username</h1>
                                                    </div>
                                                    
                                                    <div className="signup_us_ps_input">
                                                        <Input id="username_signup" styleToRender='username' type="text" hasLabel={false} placeholder='Username' styles={'dark:border-gray-50 dark:border-opacity-20"'} value={usernameValue} invalid={usernameInvalid} onChange={(v) => { handleUsernameChange(v) }}  />
                                                        < div className={setClass(styles.signup_username_error)}>
                                                            <p className={setClass(styles.signup_username_error_text, "text-red-500 mt-2 text-xs")}>{usernameErrorMessage}</p>
                                                        </div>
                                                        <div className="username_suggestions mt-4 mb-5" id='username_suggestions'>
                                                            <div className="suggestions">
                                                                <div className="suggestions_header">
                                                                    <h3 className="font-semibold mb-1">Suggestions</h3>
                                                                </div>
                                                                <div className="suggestions_items">
                                                                    <p className="suggestion_item text-primary cursor-pointer" id="suggestion_item_3"
                                                                        onClick={() => { 


                                                                            // const usernameinput = document.getElementById('username_signup') as HTMLInputElement
                                                                            // usernameinput.value = emailValue.split('@')[0]
                                                                            // handleUsernameChange(emailValue.split('@')[0])
                                                                        }}   
                                                                    >
                                                                        {emailValue.split('@')[0]}
                                                                    </p>
                                                                    {
                                                                        generatedUsernames.map((username, index) => {
                                                                            return (  
                                                                                <p key={index} className="suggestion_item text-primary cursor-pointer" id="suggestion_item_2"
                                                                                    
                                                                                >
                                                                                    {username}
                                                                                </p>
                                                                          )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Input id="password_signup" styleToRender='password' type="password" hasLabel={false} placeholder='Password' value={passwordValue} invalid={passwordInvalid && showPasswordError} showPassword={showPassword} togglePassword={() => {
                                                            togglePassword()
                                                        }} onChange={(v) => { handlePasswordInputChange(v) }} />
                                                        <div className={setClass(styles.signup_password_error)}>
                                                            <p className={setClass(styles.signup_password_error_text, "text-xs mt-2 text-gray-500")}>{!passwordInvalid ?
                                                                "Password with 6 or more characters" : null}</p>
                                                            <p className={setClass(styles.signup_password_error_text, "text-red-500 mt-2 text-xs")}>{passwordErrorMessage}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        {
                                                            spinner ?

                                                                <PrimaryButton width={"w-full py-3"} disabled={disabled} textColor="white">
                                                                    <Spinner color='white' width={'20'} />
                                                                </PrimaryButton>
                                                                :

                                                                <PrimaryButton text="Sign Up" width={"w-full py-3"} disabled={usn_pst_disabled} textColor="white" action={() => {
                                                                    handleSignup()
                                                                }} />
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
                                            }
                                            {/* <Input id="username_signup" styleToRender='default' type="text" hasLabel={false} placeholder='Username' styles={'dark:border-gray-50 dark:border-opacity-20"'} value={usernameValue} invalid={usernameInvalid} onChange={(v) => { handleUsernameChange(v) }} />
                                            < div className={setClass(styles.signup_email_error)}>
                                                <p className={setClass(styles.signup_email_error_text, "text-red-500 mt-2 text-xs")}>{usernameErrorMessage}</p>
                                            </div> */}

                                            {/* <Input id="password_signup" styleToRender='default' type="password" hasLabel={false} placeholder='Password' value={passwordValue} invalid={passwordInvalid && showPasswordError} showPassword={showPassword} togglePassword={togglePassword} onChange={(v) => { handlePasswordInputChange(v) }} />
                                            <div className={setClass(styles.signup_email_error)}>
                                                <p className={setClass(styles.signup_email_error_text, "text-xs mt-2 text-gray-500")}>{!passwordInvalid ?
                                                    "Password with 6 or more characters" : null}</p>
                                                <p className={setClass(styles.signup_email_error_text, "text-red-500 mt-2 text-xs")}>{passwordErrorMessage}</p>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* <div className={setClass(styles.signup_form_main_bottom)}>
                                        <div className={setClass(styles.signup_form_button, "mt-4")}>
                                            {
                                                spinner ?

                                                    <PrimaryButton width={"w-full py-3"} disabled={disabled} textColor="white">
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
                                    </div> */}
                                    {signupError ? <div className={setClass(styles.signup_error, 'mt-5')}>
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

export default Signup

export async function getStaticProps() {
    const data = false
    return {
        props: {
            data: data
        }
    }
}