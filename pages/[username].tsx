import type { GetServerSideProps, NextPage } from 'next'
import { isBrowser, print, OnLoad, countSet, setClass } from '../utils'
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
import { Spinner } from '../utils/loader'
import Icon from '../components/Icon'
import { DefaultButton, SecondaryButton } from '../components/Buttons'
import { ToJSX } from '../utils/render'
import moment from 'moment'
import Tabs from '../components/Tabs'
import UserSpaces from '../components/UserSpaces'
import UserMedia from '../components/UserMedias'
import UserMedias from '../components/UserMedias'
const UserProfile = ({ username, user, currentUser }: { username: User['userName'], user: User | null, currentUser: User | null }) => {
    const [showImageModal, setShowImageModal] = useState(false)
    const ifUserisCurrentUser = currentUser && currentUser.userName === username
    const tabs = [ {
            id: 0,
            name: 'Spaces',
            component: <UserSpaces spaceUsername={username} />
        },
        {
            id: 1,
            name: 'Media',
            component: <UserMedias />
        },
    ];
    
    return (
        <div className='user_profile_view'>
            {user && (
                <div className='user_profile_view_contents'>
                    <div className="image_full_banner_container">
                        <div className="image_full_banner top relative h-[200px] w-full">
                            {
                                user.bannerImage ? (
                                    <div className='relative'
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
                                <div className='absolute -bottom-14 z-20'>
                                    {
                                        user.profileImage ? (
                                            <div className='w-32 h-32 screen-sm:w-24 screen-sm:h-24 rounded-full cursor-pointer '
                                                onClick={() => {
                                                    setShowImageModal(true)

                                                }}
                                            >
                                                <ProfileImage user={user} width='w-32 screen-sm:w-24 hover:opacity-95' height='h-32 screen-sm:h-24' styles={{
                                                    img: {
                                                        border: 'border-4 dark:border-darkMode '
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
                        {
                            ifUserisCurrentUser ? (
                                <div className="profile_edit_button mt-4 pr-6">
                                    <div className="flex justify-between">
                                        <div></div>
                                        <div className="edit_profile_button">
                                            <DefaultButton styles={'border border-gray-200 dark:border-gray-200/20 dark:bg-darkMode px-4 py-2 rounded-full text-black dark:text-white font-medium hover:bg-gray-300/70 dark:hover:bg-darkModeBg/60'}>
                                                Edit Profile
                                            </DefaultButton>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="profile_edit_button mt-4 pr-6">
                                    <div className="flex justify-between">
                                        <div></div>
                                        <div className="edit_profile_button">
                                            <div className="flex items-center space-x-3">
                                                <div className="more_icon border border-gray-200 dark:border-opacity-20 rounded-full w-10 h-10 flex justify-center items-center">
                                                    <Icon type="more" styles={'cursor-pointer text-black dark:text-white'} width="20" height='20' />
                                                </div>
                                                <SecondaryButton styles={'dark:bg-white dark:text-black px-6 py-2 rounded-full text-white font-medium dark:hover:opacity-90'}>
                                                    Follow
                                                </SecondaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                    <div className="user_profile_feilds pt-4">
                        <div className="profile_displayName_userName pl-3">
                            <p className="font-bold text-xl text-black dark:text-white">{user.displayName}</p>
                            <p className="text-gray-600 dark dark:text-white/60">@{user.userName}</p>
                        </div>
                        <div className="profile_bio_container mt-3 text-black/90 dark:text-white pl-3">
                            <ToJSX text={user.bio} />
                        </div>
                        <div className="joined_date mt-3 pl-3">
                            <div className="flex items-center space-x-1">
                                <Icon type="calendar" styles={'text-black dark:text-white/60'} width="20" height='20' />
                                <p className="text-black dark:text-white/60">Joined {moment(user.createdAt).format('MMMM YYYY')}</p>
                            </div>
                        </div>
                        <div className="user_following_followers mt-3 pl-3">
                            <div className="flex space-x-3">
                                <div className="flex items-center">
                                    <p className="text-black dark:text-white font-bold">{countSet(user.followingsCount, true, 2).value} <span className='text-gray-600 dark:text-white/60 font-normal'>
                                        Following
                                    </span>
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-black dark:text-white font-bold">{countSet(user.followersCount, true, 2).value} <span className='text-gray-600 dark:text-white/60 font-normal'>
                                        {user.followersCount === 1 || user.followersCount === 0 ? 'Follower' : 'Followers'}
                                    </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="tabs mt-6">
                            <Tabs tabs={tabs} tab={0} />
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
    const [loading, setLoading] = useState(true)
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
                setLoading(false)
            } else {
                setUser(null)
                setTitle('Profile | Spacre')
                setLoading(false)
            }
        })
    }, [])



    return (
        <>
            {
                !loading && (
                    <div>
                        <Head>
                            <title>{title}</title>
                            <link rel='icon' href='/favicon.ico' />
                        </Head>
                        <Layout
                            path="home"
                            content_one={
                                <div className=''>
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
                                                        {countSet(user.spacesCount, true, 2).value} {user.spacesCount === 1 || user.spacesCount === 0 ? 'space' : 'spaces'}
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
            {
                loading && (
                    <div>
                        <Head>
                            <title>{title}</title>
                            <link rel='icon' href='/favicon.ico' />
                        </Head>
                        <Layout
                            path="home"
                            content_one={
                                <div className='bg-white dark:bg-darkMode h-screen border border-gray-100  dark:border-borderDarkMode screen-sm:w-full'>
                                    <div className="header_title_back pt-1 p-2 sticky top-0 mt-1 z-30 w-full bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(26,26,26,0.7)] backdrop-blur-[12px]">
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
                                                        {countSet(user.spacesCount, true, 2).value} {user.spacesCount === 1 || user.spacesCount === 0 ? 'space' : 'spaces'}
                                                    </span>
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 mb-8">
                                        <Spinner width={24} color="var(--color-primary)" />
                                    </div>
                                </div>
                            }
                            content_two={
                                <Widget />
                            }
                        />
                    </div>
                )
            }
        </>
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
