import type { GetServerSideProps, NextPage } from 'next'
import { isBrowser, print } from '../utils/'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUserContext from '../provider/userProvider'
import { WithAuth } from '../config/auth/route'
import { AuthUser } from '../interface/User'
import Layout from '../components/Layout'
import Search from '../components/Search'
import { useTheme } from 'next-themes'


const Saved: NextPage = () => {
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
                    <Layout
                        path="saved"
                        content_one={
                            <div>
                                <div className='feed_contents_1 sticky top-0 z-30 w-full bg-red-200 bg-[rgba(0,0,0,0.8)] backdrop-blur-[10px] p-2'>
                                    <Search />
                                </div>
                                <h1>Your saved contents</h1>
                            </div>
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
export default Saved


