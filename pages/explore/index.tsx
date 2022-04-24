import type { GetServerSideProps, NextPage } from 'next'
import { isBrowser, print, setClass } from '../../utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUserContext from '../../provider/userProvider'
import { WithAuth } from '../../config/auth/route'
import { AuthUser } from '../../interface/User'
import Layout from '../../components/Layout'
import Search from '../../components/Search'
import { useTheme } from 'next-themes'
import GuestWidget from '../../components/GuestWidget'
import ExploreTabs from '../../components/ExploreTabs'
import Head from 'next/head'

const Explore: NextPage = () => {
    const { theme, setTheme } = useTheme()
    const { authUser, signOutUser } = useUserContext()
    const router = useRouter()
    const handleSignOut = () => {
        signOutUser({
            onSuccess: () => {
                if (isBrowser()) {
                    router.push('/auth/login')
                }
                return (<></>)
            },
            onError: (error) => {
                return null
            }
        })
    }
    const setContents = (isUser: boolean) => {
        return (
            <div>
                <Head>
                    <title>Explore / Spacre</title>
                </Head>
                <Layout
                    path="explore"
                    content_one={
                        <div className='h-screen'>
                            <div className='feed_contents_1 feed_content_search sticky top-0 mt-1 z-30 w-full bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(26,26,26,0.7)] backdrop-blur-[6px]'>
                                <Search />

                                <div className="explore_tabs sticky top-0 z-30 w-full bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(26,26,26,0.7)] backdrop-blur-[6px]">
                                    <ExploreTabs tab={0} />
                                </div>
                            </div>
                            {
                                isUser ? displayUser() : displayGuest()
                            }
                        </div>
                    }
                    content_two={
                        <div>
                            {
                                isUser ? displayWidget() : displayGuestWidget()
                            }
                        </div>
                    }
                />
            </div>
        )
    }
    const displayUser = () => {
        return (
            <div className='feed_contents_2 screen-sm:pt-28'>
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
                You are logged in
            </div>
        )
    }
    const displayGuest = () => {
        return (
            <div>
               Login to explore
            </div>
        )
    }
    const displayWidget = () => {
        return (
            <div className='widget_main'>
                <h1>Explore Widget</h1>
            </div>
        )
    }
    const displayGuestWidget = () => {
        return (
            <div>
                <GuestWidget />
            </div>
        )
    }

    return WithAuth(authUser, false, true, {
        onAuthSuccess: (user: AuthUser) => {
            return setContents(true)
        },
        onAuthFail: (error: any) => {
            return setContents(false)
        }
    }, false)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            useAuth: true,
            user: "",
        }
    }
}
export default Explore

