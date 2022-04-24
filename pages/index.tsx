import type { NextPage } from 'next'
import { print } from '../utils'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import Auth from '../auth/index'
import useUserContext from '../provider/userProvider'
import { isBrowser } from '../utils/'
import { useRouter } from 'next/router'
import { WithAuth } from '../config/auth/route'
import { AuthUser } from '../interface/User'

let isNotification = false
function renderNotification() {
  isNotification = false
}
const Home: NextPage = () => {
  const { authUser } = useUserContext()
  const router = useRouter()
  useEffect(() => {
    let favicon_url = '/favicon-notification.ico'
    let favicon = document.querySelector('link[rel="icon"]')
    if (isNotification) {
      if (favicon) {
        favicon.remove()
      }
      let favicon_link = document.createElement('link')
      favicon_link.rel = 'icon'
      favicon_link.href = favicon_url
      document.head.appendChild(favicon_link)
    }
  }, [])
  renderNotification()
  return WithAuth(authUser, false, false, {
    onAuthSuccess: (user: AuthUser) => {
      if (isBrowser()) {
        router.push('/home')
      }
      return (<></>)
    },
    onAuthFail: (error: any) => {
      return (
        <div className={styles.container}>
          <Head>
            <title>Spacre</title>
            <meta name="description" content="Spacre is a social network for developers and designers" />
            <meta name='spacre:title' content='Home' />
            <meta name='spacre:description' content='Spacre is a social network for developers and designers' />
            <meta name='spacre:image' content='https://cdn.spacre.com/static/images/spacre_logo.png' />
            <meta name='spacre:url' content='https://spacre.com' />
            <meta name='spacre:type' content='website' />
            <meta name='spacre:creator' content='Spacre' />
            <meta name='spacre:card' content='summary' />
            <meta name='spacre:site_name' content='Spacre' />
            <meta name='spacre:locale' content='en_US' />
            <meta name='twitter:title' content='Home' />
            <meta name='twitter:description' content='Spacre is a social network for developers and designers' />
            <meta name='twitter:image' content='https://cdn.spacre.com/static/images/spacre_logo.png' />
            <meta name='twitter:url' content='https://spacre.com' />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Auth />
        </div>
      )
    }
  }, false)
}

export default Home
