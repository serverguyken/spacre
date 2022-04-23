import type { GetServerSideProps, NextPage } from 'next'
import { isBrowser, isSearchQuery, serachQueryKeyValues, print } from '../utils/'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUserContext from '../provider/userProvider'
import { WithAuth } from '../config/auth/route'
import { auth } from '../config/auth/firebase'
import { AuthUser } from '../interface/User'
const Search: NextPage = () => {
    const { authUser, signOutUser } = useUserContext()
    const router = useRouter()
    const searchQuery: any = isSearchQuery(router.asPath).isSearchQuery
    const query = isSearchQuery(router.asPath).query
    const queries = serachQueryKeyValues(router.asPath)
    const clickQuery = queries['click'] ? queries['click'] : null
    return WithAuth(authUser, false, true, {
        onAuthSuccess: (user: AuthUser) => {
            if (isBrowser()) {
                if (!searchQuery) {
                    router.replace('/explore')
                }
            }

            return (
                <div>
                    <h1>Search: {query}</h1>
                    {
                        clickQuery && <p>Click: #{query}</p>
                    }
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