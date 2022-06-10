import type { GetServerSideProps, NextPage } from 'next'
import { isBrowser, print, OnLoad } from '../utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useUserContext from '../provider/userProvider'
import { WithAuth } from '../config/auth/route'
import { AuthUser, User } from '../interface/User'
import Layout from '../components/Layout'
import Search from '../components/Search'
import FeedProfile from '../components/FeedProfile'
import Widget from '../components/Widget'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import { createCollectionRef, OnSnapshot } from '../config/auth/firebase'
import ProfileImage from '../components/ProfileImage'
import SpaceImageModal from '../components/SpaceImageModal'
import BackButtton from '../components/BackButton'
const UserProfile = ({ username, user, currentUser }: { username: User['userName'], user: User | null, currentUser: User | null }) => {
    const [showImageModal, setShowImageModal] = useState(false)
    return (
        <div className='user_profile_view'>
            {user && (
                <div className='user_profile_view_contents'>
                    <div className="image_full_banner_container">
                        <div className="image_full_banner top relative bg-red-300 h-[200px] w-full">
                            {
                                user.bannerImage ? (
                                    <div
                                        style={{
                                            backgroundImage: `url(${user.bannerImage})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            width: '100%',
                                            height: 'inherit',
                                        }}
                                    >
                                        <img src={user.bannerImage} alt="banner" className='opacity-0'
                                            style={{
                                                width: '100%',
                                                height: 'inherit',
                                            }}
                                        />
                                    </div>
                                )
                                    : (
                                        <div className='bg-[rgb(207,217,222)] dark:bg-[rgba(66,83,100,0.69)] max-h-[200px] h-[200px]'>
                                        </div>
                                    )
                            }
                            <div className="image-full_banner-inner p-2">
                                <div className='absolute -bottom-14'>
                                    {
                                        user.profileImage ? (
                                            <div className='w-32 h-32 screen-sm:w-24 screen-sm:h-24 rounded-full cursor-pointer bg-white'
                                                onClick={() => {
                                                    setShowImageModal(true)
                                                    
                                                }}
                                            >
                                                <ProfileImage user={user} width='w-32 screen-sm:w-24' height='h-32 screen-sm:h-24' styles={{
                                                    img: {
                                                        border: 'border-4 dark:border-darkMode'
                                                    }
                                                }} />
                                               
                                            </div>

                                        )
                                            : (
                                                <div className='border-4 border-white dark:border-darkMode bg-gray-100 dark:bg-darkModeBg w-32 h-32 rounded-full'>
                                                    &nbsp;
                                                </div>
                                            )}
                                </div>
                                {
                                    user.profileImage && 
                                    <div> {
                                        showImageModal && (
                                            <SpaceImageModal image={user.profileImage} onClose={() => {
                                                setShowImageModal(false)
                                            }} renderType="user" />
                                        )
                                    }</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {
                !user && (
                    <div className='user_profile_view_contents'>
                        <div className='image_full_banner_container'>
                            <div className="image_full_banner top relative">
                                <div className='bg-[rgb(207,217,222)] dark:bg-[rgba(66,83,100,0.69)] max-h-[200px] h-[200px]'>
                                </div>
                                <div className="image-full_banner-inner p-2">
                                    <div className='absolute -bottom-8'>
                                        <div className='border-4 border-white dark:border-darkMode bg-gray-100 dark:bg-darkModeBg w-32 h-32 rounded-full'>
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user_profile_fields mt-10 p-3">
                            <h1 className='font-bold text-lg'>@{username}</h1>
                            <h1 className='font-bold text-2xl mt-32 text-center'>
                                This account doesn’t exist.
                            </h1>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
const ProfileView: NextPage = () => {
    const router = useRouter()
    const { username } = router.query as { username: string }
    const [user, setUser] = useState<User | null>(null)
    const { user: currentUser, authUser, signOutUser } = useUserContext()
    const [title, setTitle] = useState<string>('')
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
    useEffect(() => {
        const ref = createCollectionRef('users')
        OnSnapshot(ref, (snapshot) => {
            const fetchedUsers = snapshot.docs.map((doc) => doc.data() as User)
            const user = fetchedUsers.find((user) => user.userName === username)
            if (user) {
                setUser(user)
                setTitle(`${user.displayName} (@${user.userName}) | Spacre`)
            } else {
                setUser(null)
                setTitle('Profile | Spacre')
            }
        })
    }, [])



    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout
                path="home"
                content_one={
                    <div className='bg-white dark:bg-darkMode h-screen border border-gray-100  dark:border-borderDarkMode screen-sm:w-full'>
                        <div className="header-title-back pt-1 p-2 sticky top-0 mt-1 z-30 w-full bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(26,26,26,0.7)] backdrop-blur-[12px]">
                            <div className="flex items-center space-x-3">
                                <BackButtton onClick={() => {
                                    router.push("/home");
                                }} />
                                <div className="diplay_name_sp_count">
                                    <p className="text-[1.3rem] text-gray-700 font-bold dark:text-gray-100">
                                        {user ? user.displayName : 'Profile'}
                                    </p>
                                    <p className="text-sm text-dimGray dark:text-gray-100">
                                        {user && <span>
                                            {user.spacesCount} {user.spacesCount === 1 || user.spacesCount === 0 ? 'space' : 'spaces'}
                                        </span>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <UserProfile username={username} user={user} currentUser={currentUser} />
                    </div>
                }
                content_two={
                    <Widget />
                }
            />
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
export default ProfileView
