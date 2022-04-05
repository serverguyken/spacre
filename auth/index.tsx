import type { NextPage } from 'next'
import { print } from '../utils'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Login from '../pages/auth/login'
import Signup from '../pages/auth/signup'
import styles from '../styles/Auth.module.css'
import Footer from '../components/Footer'
import { PrimaryButton, SocialButton } from '../components/Buttons'
import { setClass } from '../utils'
import Link from 'next/link'
import { isBrowser } from '../utils/'
import useUserContext from '../provider/userProvider'
import errors from '../config/auth/errors'
import { LineLoader } from '../utils/loader'
import { Alert } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';
const Auth: NextPage = () => {
    const router = useRouter()
    const [render, setRender] = useState(false)
    const [isError, setIsError] = useState(false)
    const { user, signInWithGitHubUser, error, hasError } = useUserContext();

    useEffect(() => {
        if (hasError) {
            setIsError(true)
            setRender(false)
        }
    }, [hasError])
    function renderPage(type: string) {
        switch (type) {
            case 'login':
                if (isBrowser()) {
                    router.push('/auth/login')
                }
                return null
            case 'signup':
                if (isBrowser()) {
                    router.push('/auth/signup')
                }
                return null
            default:
                return null
        }
    }
    function showAuth(type: string) {
        if (type === 'email') {
            setRender(true)
            setTimeout(() => {
                renderPage('signup')
            }, 1000)

        }
        else if (type === 'github') {
            setRender(true)
            setTimeout(() => {
                signInWithGitHubUser({
                    onSuccess: () => {
                        setRender(false)
                        router.push('/home')
                    },
                    onError: (error) => {
                        setRender(false)
                        setIsError(true)
                    }
                })
            }, 1000)
        }
    }

    const createTextAnimation = () => {
        if (isBrowser()) {
            const text = document.querySelectorAll('.slider_text')
            const txtLength = text.length
            let textIndex = 0
            if (text) {
                // if we have a list of text elements remove the first hidden class then the second hidden class and so on
                const removeHidden = (el: any) => {
                    el.classList.remove('hidden')
                }
                const addHidden = (el: any) => {
                    el.classList.add('hidden')
                }
                const addHiddenToAll = () => {
                    text.forEach(addHidden)
                }
                //addHiddenToAll()
                const addHiddenToNext = () => {
                    text[textIndex].classList.remove('hidden')
                    textIndex++
                    if (textIndex === txtLength) {
                        textIndex = 0
                    }
                }
                const removeHiddenToNext = () => {
                    text[textIndex].classList.add('hidden')
                    textIndex++
                    if (textIndex === txtLength) {
                        textIndex = 0
                    }
                }

            }

        }
    }
    //createTextAnimation()
    const generateAnimationText = () => {
        const words = ['developers', 'designers']
        return words.map((word, index) => {
            return (
                <span key={index} className={`slider_text_${index + 1}`}>
                    {word}
                </span>
            )
        })
    }


    return (
        <div className='dark:bg-darkMode'>
            <main>
                {
                    render ?

                        <LineLoader />
                        :
                        null
                }
                {
                    isError ?
                        <div className={styles.auth_ERROR}>
                            <Alert icon={<AlertCircle size={16} />} title="Error" color="red">
                                {errors[error] ? errors[error].message : 'An error occured'}
                            </Alert>

                        </div>
                        :
                        null
                }
                <div className={setClass(styles.auth_land_home, 'dark:bg-darkMode')}>
                    <div className={setClass(styles.sides_layout, "sp_container")}>
                        <div className={styles.side_left}>
                            <div className={styles.side_left_content}>
                                <div className={styles.main_heading}>
                                    <div className={setClass(styles.main_heading_contents)}>
                                        <h1 className={setClass(styles.main_heading_text, "text-primary font-bold text-5xl")}>Spacre</h1>
                                        <h2 className={setClass(styles.main_heading_tag, "mt-4 text-2xl slide")}>Connect with developers and designers around you on Spacre.</h2>
                                    </div >
                                </div >
                            </div >
                        </div >
                        <div className={setClass(styles.side_right)}>
                            <div className={setClass(styles.side_right_content)}>
                                <div className={setClass(styles.sign_up_login)}>
                                    <div className={setClass(styles.sign_up_login_contents)}>
                                        <div className={setClass(styles.signup_social)}>
                                            <SocialButton disabled={false} color="bg-white" text="Sign up with Github" textStyle='text-lg dark:text-dark' width="px-14 py-3" icon="github" iconWidth='w-6' action={() => { showAuth('github') }} />
                                        </div >
                                        <div className={setClass(styles.or_opt_ele, "after:bg-light border-b border-b-gray-300 dark:after:bg-darkMode dark:after:content-['OR'] dark:border-b-gray-200 dark:border-opacity-20")}>
                                        </div>
                                        <div className={setClass(styles.signup_email)}>
                                            <PrimaryButton text="Sign up with Email" textStyle='text-lg' textColor='white' width="px-20 py-3" action={() => {
                                                showAuth('email')
                                            }} />
                                        </div>
                                    </div >

                                </div >
                            </div >
                            <div className={setClass(styles.side_right_bottom)}>
                                <div className={setClass("signup_legal")}>
                                    <p className={setClass("text-sm mt-5 w-9/12 text-center m-auto")}>By signing up, you agree to the <span className={setClass("text-primary underline")}><Link href="/legal/terms">Terms of Service</Link></span> and <span className={setClass("text-primary underline")}><Link href="/legal/privacy">Privacy Policy</Link></span>.</p>
                                </div>
                                <div className={setClass(styles.alr_login)}>
                                    <p className={setClass("text-sm mt-5 w-8/12 text-center m-auto")}>Already have an account? <span className={setClass("text-primary underline")}><Link href="/auth/login">Log in</Link></span></p>
                                </div>
                            </div>

                        </div >
                    </div >
                </div >
            </main >
            <Footer />
        </div >
    )
}

export default Auth