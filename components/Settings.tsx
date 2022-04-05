import type { GetServerSideProps } from 'next'
import { isBrowser, print } from '../utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUserContext from '../provider/userProvider'
import Sidebar from './Sidebar'
import Feed from './Feed'
import styles from '../styles/Main.module.css'
import Header from './Header'

import { useTheme } from 'next-themes'


const Settings = () => {
    return (
        <div>
            <h1>Settings</h1>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            useAuth: true,
            user: "",
        }
    }
}
export default Settings
