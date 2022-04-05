import type { GetServerSideProps, NextPage } from 'next'
import { isBrowser, isSearchQuery, print } from '../utils/'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUserContext from '../provider/userProvider'
import { WithAuth } from '../config/auth/route'
import { auth } from '../config/auth/firebase'
import { User } from '../interface/User'
import useGetUser from '../config/auth/user'
const Search: NextPage = () => {
    const { user, signOutUser } = useUserContext()
    const router = useRouter()
    let searchQuery: any = isSearchQuery(router.asPath).isSearchQuery
    let query = isSearchQuery(router.asPath).query

    return WithAuth(user, false, true, {
        onAuthSuccess: (user: User) => {
            if (isBrowser()) {
                if (!searchQuery) {
                    router.replace('/explore')
                }
            }

            return (
                <div>
                    <h1>Search: {query}</h1>
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
export default Search