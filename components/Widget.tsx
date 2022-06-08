import Image from "next/image"
import { SecondaryButton } from "./Buttons"
import NextLink from "next/link"
import Footer from "./Footer"
import Icon from "./Icon"
import { useState, useEffect } from 'react'
import { isBrowser, generateLoadingTime, TimeOut, isFollowing } from '../utils'
import { Spinner } from '../utils/loader'
import Video from './Video'
import WidgetFooter from "./WidgetFooter"
import useUserContext from "../provider/userProvider"
import { Constructor, User } from "../interface/User"
import ProfileImage from "./ProfileImage"


const jobs = [
    {
        id: 1,
        title: "Software Engineer",
        company: "Google",
        pay: "$100k - $150k",
        location: "New York, NY",
        image: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png",
        link: "/j/apply/1",
    },
    {
        id: 2,
        title: "Web Designer",
        company: "Facebook",
        pay: "$80k - $100k",
        location: "Los Angeles, CA",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/800px-2021_Facebook_icon.svg.png",
        link: "/j/apply/2",
    },
    {
        id: 3,
        title: "Data Analyst",
        company: "Klarna",
        pay: "$120k - $150k",
        location: "San Francisco, CA",
        image: "https://klarna.kattis.com/images/site-logo?v=da5c475a06b60a99e1299c069467aa41",
        link: "/j/apply/3",
    },
    {
        id: 4,
        title: "HR Manager",
        company: "Amazon",
        pay: "$90k - $110k",
        location: "Seattle, WA",
        image: "https://i2.wp.com/www.alphr.com/wp-content/uploads/2019/12/Amazon-Keeps-Logging-Me-Out-What-to-Do.jpg?fit=1000%2C563&ssl=1",
        link: "/j/apply/4",
    },
    {
        id: 5,
        title: "Embedded Engineer",
        company: "Intel",
        pay: "$100k - $150k",
        location: "San Francisco, CA",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1005px-Intel_logo_%282006-2020%29.svg.png",
        link: "/j/apply/5",
    }
]
const footer_links = [
    {
        name: 'Privacy',
        to: '/legal/privacy',
    },
    {
        name: 'Terms',
        to: '/legal/terms',
    },

    {
        name: 'Ads',
        to: '/legal/ads',
    },
    {
        name: 'Cookies',
        to: '/legal/cookies',
    },
]
const Widget = () => {
    const { user:currentUser, getUsers, updateUser } = useUserContext()
    const [rendered, setRendered] = useState(false)
    const [suggestedFollowers, setSuggestedFollowers] = useState<User[]>([])
    useEffect(() => {
        getUsers(currentUser.uid, {
            onSuccess: (data: User[]) => {
                const fetchedSuggestedFollowers = data.filter((user: User) => !isFollowing(currentUser.following, user))
                const filteredSuggestedFolloers = fetchedSuggestedFollowers.filter((user: User) => user.uid !== currentUser.uid)
                setSuggestedFollowers(filteredSuggestedFolloers)
            },
            onError: (error: any) => {
                return null;
            }
        });
    }, [currentUser]);
    const setRender = () => {
        TimeOut(() => {
            setRendered(true)
        }, generateLoadingTime(1000, 2000))
    }
    useEffect(() => {
        if (isBrowser()) {
            setRender()
        }
    }, [])
    const followUser = (userToFollow: User) => {
        const forUser = {
            ...userToFollow,
            followers: [...userToFollow.followers, {userId: currentUser.uid}],
            followersCount: userToFollow.followersCount + 1,
          };
          const forCurrentUser = {
            ...currentUser,
            following: [...currentUser.following, {userId: userToFollow.uid}],
            followingsCount: currentUser.followingsCount + 1,
          };
          updateUser(userToFollow.uid, forUser, {
            onSuccess: () => {
                updateUser(currentUser.uid, forCurrentUser, {
                    onSuccess: () => {
                        const fetchedSuggestedFollowers = suggestedFollowers.filter((user: User) => user.uid !== userToFollow.uid)
                        setSuggestedFollowers(fetchedSuggestedFollowers)
                    },
                    onError: (err: any) => {
                    },
                });
            },
            onError: (err: any) => {
            },
          });
    }

    return (
        <div className='widget_main self-start w-full pt-4 sticky top-0 pb-6'>
            <div className="mb-2">
                <div className="">
                    <h1 className="text-gray-400 dark:text-white text-sm flex-1 mb-2">Sponsored</h1>
                    <div className="video_ad_container_inner rounded-full">
                        <Video id="video_ad_1" src="https://sfsfiles.spacre.com/videos/bc27b369-e66c-4b4b-a73d-66f0efaea6ac_yt5s.com-develop._preview._ship..mp4" autoPlay muted loop hasControls={false} isAd />
                    </div>
                </div>
                <div className="jobs_list_container mb-5">
                    {
                        rendered ?
                            <div className="jobs_list_header bg-light dark:bg-primary dark:bg-opacity-5 rounded-lg p-2 mt-5 mb-5">
                                <h1 className="text-lg font-bold p-2">Jobs</h1>
                                <div className="jobs_list_header_list ">
                                    {
                                        jobs.map(job => {
                                            return (
                                                <div key={job.id} className="jobs_list_header_list_item flex items-center space-x-4 p-2 cursor-pointer">
                                                    <div className="jobs_list_header_list_item_image">
                                                        <img src={job.image} alt={job.title} width={40} height={34} className="rounded-full w-9 h-8" />
                                                    </div>
                                                    <div className="flex justify-between items-center w-full">
                                                        <div className="jobs_list_header_list_item_name">
                                                            <NextLink href={job.link}>
                                                                <a className="text-sm font-bold hover:underline">{job.title}</a>
                                                            </NextLink>
                                                            <div className="flex items-center space-x-1 text-dimGray dark:text-gray-50 dark:text-opacity-50">
                                                                <p className="text-xs">{job.company}</p>
                                                                <p className="text-xs before:content-['•'] before:text-[12px] before:ml-[4px] before:mr-[4px]">{job.pay}</p>
                                                            </div>
                                                            <p className="text-xs text-gray-400 dark:text-gray-50 dark:text-opacity-30">{job.location}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            :
                            <div className="h-20 mt-20">
                                <Spinner width={'20'} color="var(--color-primary)" />
                            </div>
                    }
                    
                   


                </div>
            </div>

            <div className="people_to_follow bg-white dark:bg-darkMode rounded-lg p-2 mb-5">
                {
                    rendered
                        ?
                        <div className="people_to_follow_header">
                            <h1 className="text-lg font-bold p-2">People to follow</h1>
                            <div className="ptf_list">
                                {
                                    suggestedFollowers.map((person: User) => {
                                        return (
                                            <div key={person.uid} className="ptf_list_item flex items-center space-x-3 p-2 mb-3 cursor-pointer">
                                                <div className="ptf_list_item_image">
                                                <ProfileImage user={person}  />
                                                </div>
                                                <div className="flex justify-between items-center w-full">
                                                    <div className="ptf_list_item_name">
                                                        <h3 className="text-sm font-bold">{person.displayName}</h3>
                                                        <p className="text-xs dark:text-gray-50 dark:text-opacity-50">@{person.userName}</p>
                                                    </div>
                                                    <div className="follow_btn">
                                                        <SecondaryButton text="Follow" textColor="white" styles={'py-1 px-5 bg-black text-white dark:bg-white dark:text-black  rounded-full'} 
                                                        action={() => {
                                                            followUser(person)
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        <div className="h-40 mt-40">
                            <Spinner width={'20'} color="var(--color-primary)" />
                        </div>
                }
            </div>
           <WidgetFooter />
        </div>
    )
}

export default Widget