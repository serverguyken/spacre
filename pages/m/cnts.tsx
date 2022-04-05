import type { GetServerSideProps, NextPage } from 'next'
import { isBrowser, print } from '../../utils/'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUserContext from '../../provider/userProvider'
import { WithAuth } from '../../config/auth/route'
import { auth } from '../../config/auth/firebase'
import { User } from '../../interface/User'
import Sidebar from '../../components/Sidebar'
import styles from '../../styles/Main.module.css'
import Header from '../../components/Header'
import { useTheme } from 'next-themes'
import Display from '../../components/Display'
import Layout from '../../components/Layout'


const Cnts: NextPage = () => {
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

    return WithAuth(user, false, true, {
        onAuthSuccess: (user: User) => {
            return (
                <Layout
                    path="cnts"
                    content_one={
                        <div>
                            <main>
                                <div className='pt-14 flex justify-between main_container pb-20'>
                                    {/* Sidebar */}
                                    {/* Feed */}
                                    <Display />
                                </div>
                            </main>
                        </div>
                    }
                />
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
export default Cnts
