import type { GetServerSideProps, NextPage } from 'next'
import { isBrowser, print } from '../utils/'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUserContext from '../provider/userProvider'
import { WithAuth } from '../config/auth/route'
import { User } from '../interface/User'
import Layout from '../components/Layout'
import Search from '../components/Search'
import { useTheme } from 'next-themes'


const Explore: NextPage = () => {
    const { theme, setTheme } = useTheme()
    const { user, signOutUser } = useUserContext()
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
    const setContents = () => {
        return (
            <div>
                <Layout
                    path="explore"
                    content_one={
                        <div className='h-screen'>
                            <div className='feed_contents_1 sticky top-0 z-30 w-full bg-red-200 bg-[rgba(0,0,0,0.8)] backdrop-blur-[10px] p-2'>
                                <Search />
                            </div>
                            <h1>Explore</h1>
                        </div>
                    }
                />
            </div>
        )
    }
    return WithAuth(user, false, true, {
        onAuthSuccess: (user: User) => {
            return setContents()
        },
        onAuthFail: (error: any) => {
            return setContents()
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
export default Explore

