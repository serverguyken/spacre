import type { GetServerSideProps, NextPage } from 'next'
import { isBrowser, print, OnLoad } from '../utils/'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUserContext from '../provider/userProvider'
import { WithAuth } from '../config/auth/route'
import { AuthUser, User } from '../interface/User'
import Layout from '../components/Layout'
import Search from '../components/Search'
import FeedProfile from '../components/FeedProfile'
import Widget from '../components/Widget'
import { useTheme } from 'next-themes'
import Head from 'next/head'

const Home: NextPage = () => {
    const { theme, setTheme } = useTheme()
    const { authUser, signOutUser } = useUserContext()
    const router = useRouter()
    
    const handleSignOut = () => {
        signOutUser({
            onSuccess: () => {
                if (isBrowser()) {
                    router.push('/auth/login')
                }
            },
            onError: (error) => {
                return null
            }
        })
    }
    
    return WithAuth(authUser, false, true, {
        onAuthSuccess: (user: AuthUser) => {
            return (
                <div>
                    <Head>
                        <title>Home / Spacre</title>
                        <link rel='icon' href='/favicon.ico' />
                    </Head>
                    <Layout
                        path="home"
                        content_one={
                            <div>
                                <div className='feed_contents_1 feed_content_search sticky top-0 mt-1 z-30 w-full bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(26,26,26,0.7)] backdrop-blur-[12px] p-2'>
                                    <Search />
                                </div>
                                <div className="feed_contents_2">
                                    <FeedProfile />
                                </div>
                            </div>
                        }
                        content_two={
                            <Widget />
                        }
                    />
                </div>
            )
        },
        onAuthFail: (error: any) => {
            return (<></>)
        }
    })
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            useAuth: true,
            user: "",
        }
    }
}
export default Home
