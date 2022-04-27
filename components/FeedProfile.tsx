import TextCard from './TextCard'
import { User } from '../interface/User'
import { setClass, isBrowser, print, TimeOut, addClass, removeClass, generateLoadingTime, OnLoad, countSet, formatDate } from '../utils/'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useUserContext from '../provider/userProvider'
import ProfileImage from './ProfileImage'
import Link from 'next/link'
import Icon from './Icon'
import { HeartIcon, AnnotationIcon, UploadIcon, BookmarkIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid, AnnotationIcon as AnnotationIconSolid, UploadIcon as UploadIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/solid'
import Video from './Video'
import Poll from './Poll'
import PullToRefresh from 'react-simple-pull-to-refresh';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/outline';
import { Spinner } from '../utils/loader'
import ProfileCardHover from './ProfileCardHover'
import Skeleton from './Skeleton'
import API from '../config/api'
import store from '../store'
import Tooltip from './Tooltip'







const FeedProfile = () => {
    const { user, signOutUser, getUsers } = useUserContext()
    // useEffect(() => {
    //     getUsers(user.uid)
    // }, [getUsers, user.uid])
    const [rendered, setRendered] = useState(false)
    const users = store.get('fetchUsers').users
    const _status = store.get('fetchUsers').status
    const [isUsers, setIsUsers] = useState(false)
    console.log(users, _status)
    const [refreshed, setRefreshed] = useState(true)
    const [dummyUsers, setDummyUsers] = useState([{
        id: 1,
        userName: 'david224',
        displayName: 'David Brown',
        profileImage: 'https://images.generated.photos/DDf2TAj3WgXlcaRW_Rw_C49RS5ZRIqIcS0h8IC7iVSM/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDA3MDYzLmpwZw.jpg',
        isVerified: true,
        isFollowing: false,
        bio: 'I create things for the web @tech | Business owner #developerlife',
        followersCount: countSet(1234666669, true).value,
        followingCount: countSet(50, true).value,
        spacesCount: countSet(8, true).value,
        postTimeStamp: 'Jan 28',
        postContent: 'How to create a react app with nextjs',
        posContentHeader: 'How to create a react app with nextjs',
        postContentTagText: 'Creating a react app is very simple. Tips will be provided soon.',
        postLiked: false,
        postSaved: false,
        likesCount: countSet(12, false).value,
        commentsCount: countSet(2, false).value,
        sharesCount: countSet(1, false).value,
    },
    {
        id: 2,
        userName: 'sanjayp',
        displayName: 'Sanjay P',
        profileImage: 'https://images.generated.photos/lSQCOEwpOFJ_Ua0DFgJJhp4YPZROcxvcP_fjR6GvsVc/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjUyNTYyLmpwZw.jpg',
        isVerified: false,
        isFollowing: false,
        bio: 'Content creator work for @daily - Develper Advocate',
        followersCount: countSet(45693, true).value,
        followingCount: countSet(2109, true).value,
        spacesCount: countSet(4, true).value,
        postTimeStamp: 'Feb 16',
        postContent: 'Hello everyone, the last livestream was great. If you missed it, comment below when you think we should have another.😄 bye:)',
        postContentTagText: 'Comment your answer below.',
        postLiked: false,
        postSaved: false,
        likesCount: countSet(3658, false).value,
        commentsCount: countSet(100, false).value,
        sharesCount: countSet(22, false).value,
    },
    {
        id: 3,
        userName: 'sarah_le78',
        displayName: 'Sarah Lee',
        profileImage: 'https://images.generated.photos/yZe4-qr0QKM1djPOhY9TfynsPSNdAWX7TzDpiXDFWas/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjU0ODE0LmpwZw.jpg',
        isVerified: false,
        isFollowing: true,
        bio: 'Web 3.0 Developer - Building the future of the web #future',
        followersCount: countSet(508, true).value,
        followingCount: countSet(347, true).value,
        spacesCount: countSet(10, true).value,
        postTimeStamp: 'March 10',
        postContent: 'Web 3.0 is coming soon. Check out the link below.',
        postImage: 'https://mlxova6nqons.i.optimole.com/qgiRRAs.XcRg~5bd19/w:auto/h:auto/q:86/https://milyin.com/wp-content/uploads/2022/02/What-is-Web-3.0-Why-it-matter-Web-2.0-vs-Web-3.0.png',
        postLink: 'https://www.web3.0.com/',
        postLiked: true,
        postSaved: false,
        likesCount: countSet(12).value,
        commentsCount: countSet(2).value,
        sharesCount: countSet(0).value,
    },
    {
        id: 4,
        userName: 'serverguyken99',
        displayName: 'serverguyken',
        profileImage: null,
        isVerified: true,
        isFollowing: true,
        bio: 'Computer Science Student - Founder @spacre | Helping fellow developers and designers build connect',
        followersCount: countSet(2689654, true).value,
        followingCount: countSet(1234, true).value,
        spacesCount: countSet(1, true).value,
        postTimeStamp: 'March 10',
        postContent: `'My first Web 3.0 is coming soon. Check out the link below. Hello everyone, the last livestream was great. If you missed it, comment below when you think we should have another.😄 bye:)  Hello everyone, the last livestream was great. If you missed it, comment below when you think we should have another.😄 bye:) Hello everyone, the last livestream was great. If you missed it, comment ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggfffffffffffffffffffffffffffff '`,
        postLiked: true,
        postSaved: false,
        likesCount: countSet(351).value,
        commentsCount: countSet(17).value,
        sharesCount: countSet(1).value,
    },
    {
        id: 5,
        userName: 'james_bond',
        displayName: 'James C. Bond',
        profileImage: 'https://images.generated.photos/lby-AqX1D1WkyGljF4B0TFSjhu0dJx7Sh76V2LY785E/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjAxMTU1LmpwZw.jpg',
        isVerified: false,
        isFollowing: false,
        bio: 'From baking cookies to coding, I am a full stack developer. I love to learn new things and share my knowledge with others.',
        followersCount: countSet(162864, true).value,
        followingCount: countSet(2453, true).value,
        spacesCount: countSet(7, true).value,
        postTimeStamp: 'March 15',
        postContent: 'Just got a new job @google. I am so excited!. Thanks @mike_bond for the job offer.',
        postLiked: false,
        postSaved: false,
        likesCount: countSet(3214780).value,
        commentsCount: countSet(552).value,
        sharesCount: countSet(0).value,
    },
    {
        id: 6,
        userName: 'Fireshipio',
        displayName: 'Fireship IO',
        profileImage: 'https://sfsfiles.spacre.com/profile/39345492-459d-4b68-8732-53912e06ebbe_fireship_logo.png',
        isVerified: true,
        isFollowing: true,
        bio: 'Content creator | fireship.io',
        followersCount: countSet(1786532, true).value,
        followingCount: countSet(197, true).value,
        spacesCount: countSet(9, true).value,
        postTimeStamp: '20h',
        postContent: 'Uploaded a new video. Check it out!',
        postVideo: 'https://sfsfiles.spacre.com/videos/666b8d38-2029-499a-9c0d-6e7db12da6f6_yt5s.com-devops_ci_cd_explained_in_100_seconds.mp4',
        postVideoViews: '200.16k',
        postLiked: true,
        postSaved: true,
        likesCount: countSet(200009).value,
        commentsCount: countSet(156).value,
        sharesCount: countSet(5).value,
    },
    {
        id: 7,
        userName: 'Gatsby',
        displayName: 'Gatsby',
        profileImage: 'https://pngpart.com/images/bt/gatsby-2.png',
        isVerified: true,
        isFollowing: true,
        bio: 'Gatsby is a static site generator. It is a framework for building blazing fast websites and apps. visit https://gatsbyjs.com dd',
        followersCount: countSet(3865027, true).value,
        followingCount: countSet(52, true).value,
        spacesCount: countSet(2, true).value,
        postTimeStamp: '2h',
        postContent: 'New feature added to the site. Please feel free to leave a comment.',
        postLink: 'https://www.gatsbyjs.org/',
        postLiked: false,
        postSaved: true,
        likesCount: countSet(31000).value,
        commentsCount: countSet(27).value,
        sharesCount: countSet(2).value,
    }])
    const [profileHoverCard, setProfileHoverCard] = useState(false)
    const [profileHoverCardPosition, setProfileHoverCardPosition] = useState(null)
    const router = useRouter()

    if (isBrowser()) {
        TimeOut(() => {
            setRendered(true)
        }, generateLoadingTime(1000, 3000))
    }
    const handleRefresh = async () => {
        setRefreshed(false)
        TimeOut(() => {
            setRefreshed(true)
        }, 1000)
    }

    return (
        <div className='relative mt-2'>
            <div>
                <TextCard />
            </div>
            {
                !rendered ?
                    <div className='screen-sm:pt-24'>
                        <div className='opacity-0'>
                            <Skeleton type="feed" />
                        </div>
                        <div className='flex absolute top-60 left-1/2  justify-center'>

                            <Spinner width={24} color='var(--color-primary)' />
                        </div>
                    </div>
                    :
                    <PullToRefresh
                        isPullable={true}
                        onRefresh={handleRefresh}
                        pullingContent={
                            <div className="pullDownContentHeader pt-8 screen-sm:pt-20 flex justify-center">
                                <div className="pullDownContentHeaderText">
                                    <ArrowDownIcon width={20} className="text-gray-500" />
                                </div>
                            </div>
                        }
                        refreshingContent={
                            <div className="refreshingConentHeader pt-8 screen-sm:pt-20 flex justify-center">
                                <div className="refreshingConentHeaderText">
                                    <Spinner width={24} color="var(--color-primary)" />
                                </div>
                            </div>
                        }
                    >
                        <div className='screen-sm:pt-16 mb-5 overflow-hidden'>
                            {
                                refreshed ?
                                    dummyUsers.map((user: any) => {

                                        return (
                                            <div key={user.userName} id={`${user.userName}_profile_feed_view`} className="bg-white dark:bg-darkMode hover:bg-gray-50 dark:hover:bg-gray-300 dark:hover:bg-opacity-[0.02] cursor-pointer whitespace-pre-wrap feed_post_contents_card pt-3 pb-2 p-2  border-b border-gray-100  dark:border-borderDarkMode">
                                                <div className="flex justify-between">
                                                    <div className='flex space-x-2 w-full'>
                                                        <div className="profile_image mt-1">
                                                            <Link href={`/${user.userName}`}>
                                                                <a>
                                                                    <ProfileImage user={user} />
                                                                </a>
                                                            </Link>
                                                        </div>
                                                        <div className="profile_name_post_feed w-full -mt-1 pl-[10px] pr-[10px]">
                                                            <div className="profile_name w-full">
                                                                <div className="flex justify-between">
                                                                    <div className="profile_names_content w-full">
                                                                        <div className="profile_name_link relative max-w-[16rem] inline-block">
                                                                            <div className='flex items-center'>
                                                                                <div className="whitespace-nowrap max-w-[16rem] text-ellipsis overflow-hidden hover:underline"
                                                                                    onMouseOver={() => {
                                                                                        const profile_feed_view = document.getElementById(`${user.userName}_profile_feed_view`) as HTMLDivElement
                                                                                        const profile_hover_card = document.getElementById(`${user.userName}_profile_hover_card`) as HTMLDivElement
                                                                                        if (profile_feed_view && profile_hover_card) {
                                                                                            const window_height = window.innerHeight
                                                                                            const profile_feed_view_rect = profile_feed_view.getBoundingClientRect()
                                                                                            const profile_feed_view_height = window_height - profile_feed_view_rect.top
                                                                                            if (profile_feed_view_height <= 200) {
                                                                                                profile_hover_card.classList.remove('top-6');
                                                                                                profile_hover_card.classList.add('bottom-6');
                                                                                            } else {
                                                                                                profile_hover_card.classList.remove('bottom-6');
                                                                                                profile_hover_card.classList.add('top-6');
                                                                                            }
                                                                                            const screen_width = window.innerWidth
                                                                                            if (screen_width < 800) {
                                                                                                profile_hover_card.classList.remove('bottom-6');
                                                                                                profile_hover_card.classList.add('top-6');
                                                                                            }
                                                                                        }
                                                                                    }}
                                                                                >

                                                                                    <Link href={`/${user.userName}`}>
                                                                                        <a className="font-semibold feed_user_profile_name">{user.displayName}</a>
                                                                                    </Link>
                                                                                </div>
                                                                                {
                                                                                    user.isVerified && <div className='mt-1'>
                                                                                        <Icon type="verified" />
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                            <div id={`${user.userName}_profile_hover_card`} className="profile_hover_card absolute pt-2 z-40 top-6 -left-14 w-auto hidden invisible opacity-0">
                                                                                <ProfileCardHover user={user} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="profile_username_post_timestamp flex items-center">
                                                                            <div className="profile_username whitespace-nowrap max-w-[16rem] text-ellipsis overflow-hidden">
                                                                                <Link href={`/${user.userName}`}>
                                                                                    <a className="text-sm text-dimGray dark:text-darkText">@{user.userName}</a>
                                                                                </Link>
                                                                            </div>
                                                                            <p className="before:content-['•'] before:text-[12px] before:ml-[4px] before:mr-[4px] -mt-1 before:dark:text-gray-50 before:dark:text-opacity-30"></p>
                                                                            <Tooltip
                                                                                title={formatDate('2022-04-23T09:29:00.001Z').format('MMMM Do YYYY, h:mm:ss a')}
                                                                                placement="center"
                                                                                position='bottom'
                                                                                transition='fade'
                                                                                transitionDuration={200}
                                                                                classNames={{
                                                                                    body: setClass('tooltip_comp -mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1', `${formatDate('2022-04-23T09:29:00.001Z').format('MMMM Do YYYY, h:mm:ss a') == "" ? 'hidden' : ''}`),
                                                                                }}
                                                                                color='gray'
                                                                            >
                                                                                <p className='text-sm text-dimGray hover:underline'>{formatDate('2022-04-23T09:29:00.001Z').startOf('h')}</p>
                                                                            </Tooltip>
                                                                        </div>
                                                                    </div>
                                                                    <Tooltip
                                                                        title="More"
                                                                        placement="center"
                                                                        position='bottom'
                                                                        transition='fade'
                                                                        transitionDuration={200}
                                                                        classNames={{
                                                                            body: 'tooltip_comp -mt-4 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1',
                                                                        }}
                                                                        color='gray'
                                                                        
                                                                    >
                                                                        <div className="post_more_action text-gray-500 dark:text-darkText hover:bg-primary hover:bg-opacity-10 hover:text-primary rounded-full w-8 h-8 flex justify-center items-center">
                                                                            <DotsHorizontalIcon width={20} />
                                                                        </div>
                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                            <div className="post_feed_contents mt-2 leading-[19px]">
                                                                <div className="post_contents w-full">
                                                                    {
                                                                        user.postContentHeader && <h2 className="text-black dark:text-white font-semibold">{user.postContentHeader}</h2>
                                                                    }
                                                                    {
                                                                        user.postContent && <div className='break-words whitespace-pre-wrap'>
                                                                            <span className="text-sm text-black dark:text-white">{user.postContent}</span>
                                                                        </div>
                                                                    }
                                                                    {
                                                                        user.postContentTagText && <p className="mt-2 text-sm text-black dark:text-white">{user.postContentTagText}</p>
                                                                    }
                                                                    {
                                                                        user.postVideo && <div className="mt-4 w-full">
                                                                            <Video id={`${user.userName}_${user.id}`} src={user.postVideo} isAd={false} videoViews={user.postVideoViews} />
                                                                        </div>
                                                                    }
                                                                    {
                                                                        user.postImage && <div className="mt-4 w-4/5 max-w-[80%] h-4/5">
                                                                            <img className="w-full h-full rounded-xl" src={user.postImage} alt="post" />
                                                                        </div>
                                                                    }
                                                                    {
                                                                        user.postLink && <div className="mt-4 w-full">
                                                                            <a href={user.postLink} target="_blank" rel="noopener noreferrer" className='text-link'>
                                                                                {user.postLink}
                                                                            </a>
                                                                        </div>
                                                                    }
                                                                    {
                                                                        user.hasPoll && <div className="mt-4 w-full bg-white shadow-sm rounded-lg  border max-w-xs dark:bg-darkModeBg dark:border-darkModeBg">
                                                                            {
                                                                                user.poll.options.map((poll: any) => {
                                                                                    return (
                                                                                        <div key={poll.id} className="flex items-center border p-2 pl-3 cursor-pointer dark:hover:bg-blue-100 dark:hover:bg-opacity-10  dark:bg-blue-300 dark:bg-opacity-10 dark:border dark:border-darkModeBg rounded-md">
                                                                                            <div className="poll_option_image">
                                                                                            </div>
                                                                                            <div className="poll_option_name">
                                                                                                <h2 className="text-sm text-gray-600 dark:text-white">{poll.option}</h2>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div className="post_user_actions mt-3 pb-1 max-w-[80%]">
                                                                    <div className="flex justify-between items-center">
                                                                        <div className={setClass("post_action post_user_like_action relative select-none flex like_animation items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-salmon hover:bg-opacity-10 hover:text-salmon dark:hover:text-salmon", user.postLiked ? "text-salmon dark:text-salmon" : 'text-gray-500  dark:text-darkText')}>
                                                                            {
                                                                                user.postLiked ?
                                                                                    <HeartIconSolid className={'text-salmon'} width={16} />
                                                                                    :
                                                                                    <HeartIcon width={16} />
                                                                            }
                                                                            <p className="text-xs">{user.likesCount}</p>

                                                                            <div className="post_action_tooltip post_like_tooltip invisible opacity-0 absolute top-7 right-0 z-20 bg-gray-500 dark:bg-darkModeBg dark:text-white w-12 p-1 text-center text-xs text-white rounded shadow-sm">
                                                                                <div className="like_tooltip_content">
                                                                                    {
                                                                                        user.postLiked ? <span>Unlike</span> : <span>Like</span>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="post_action post_user_comment_action relative select-none flex text-gray-500 dark:text-darkText items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-green-600 hover:bg-opacity-10 hover:text-green-600 dark:hover:text-green-600">
                                                                            <AnnotationIcon width={16} />
                                                                            <p className="text-xs">{user.commentsCount}</p>
                                                                            <div className="post_action_tooltip post_comment_tooltip invisible opacity-0 absolute top-7 right-0 z-20 bg-gray-500 dark:bg-darkModeBg dark:text-white w-12 p-1 text-center text-xs text-white rounded shadow-sm">
                                                                                <div className="comment_tooltip_content">
                                                                                    <span>Reply</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="post_action post_user_share_action relative select-none flex text-gray-500 dark:text-darkText items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary dark:hover:text-primary">
                                                                            <UploadIcon width={16} />
                                                                            <p className="text-xs">{user.sharesCount}</p>
                                                                            <div className="post_action_tooltip post_share_tooltip invisible opacity-0 absolute top-7 right-0 z-20 bg-gray-500 dark:bg-darkModeBg dark:text-white w-12 p-1 text-center text-xs text-white rounded shadow-sm">
                                                                                <div className="share_tooltip_content">
                                                                                    <span>Share</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="post_action post_user_save_action relative select-none flex text-gray-500 dark:text-darkText items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary dark:hover:text-primary" onClick={() => {
                                                                            if (isBrowser()) {
                                                                                alert("saved post2")
                                                                            }
                                                                        }}  >
                                                                            {
                                                                                user.postSaved ?
                                                                                    <BookmarkIconSolid className={'text-primary'} width={16} />
                                                                                    :
                                                                                    <BookmarkIcon width={16} />
                                                                            }
                                                                            <div className="post_action_tooltip post_save_tooltip invisible opacity-0 absolute top-7 -right-3 z-20 bg-gray-500 dark:bg-darkModeBg dark:text-white w-12  p-1 text-center text-xs text-white rounded shadow-sm">
                                                                                <div className="save_tooltip_content">
                                                                                    {
                                                                                        user.postSaved ? <span>Saved</span> : <span>Save</span>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <Skeleton type="feed" />
                            }
                        </div>
                    </PullToRefresh>
            }
        </div>
    );
}

export default FeedProfile;