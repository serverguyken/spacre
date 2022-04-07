import Icon from './Icon'
import SidebarLink from './SidebarLink'
import  Link  from 'next/link'
import {
    HomeIcon as HomeIconSolid,
    FireIcon as FireIconSolid,
    BriefcaseIcon as BriefcaseSolid,
    InboxIcon as InboxIconSolid,
    BookmarkIcon as BookmarkSolid,
    UserIcon as UserSolid,
} from '@heroicons/react/solid'
import {
    HomeIcon,
    FireIcon,
    BriefcaseIcon,
    InboxIcon,
    BookmarkIcon,
    UserIcon,
    PlusIcon,
    DotsCircleHorizontalIcon
} from "@heroicons/react/outline"
import { PrimaryButton } from './Buttons'
import { isBrowser } from '../utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import store from '../store'


const Sidebar = ({ path }: {
    path: string
}) => {
    const router = useRouter()
    const [postTextBoxShown, setPostTextBoxShown] = useState(false)
    const goto = (path: string) => {
        if (isBrowser()) {
            router.push(path)
        }
        return null
    }
    const showPostTextBox = () => {
        store.content.data.postTextareaShown = true
    }

    const setActive = (path: string) => {
        if (isBrowser() && router.pathname && router.pathname.split('/')[1] === path) {
            return true
        }
        return false
    }
    return (
        <div className='bg-white dark:bg-darkMode  screen-sm:border-b screen-sm:border-opacity-10 screen-sm:dark:border-b-gray-50 screen-sm:dark:border-opacity-5'>
            <div className="sidebar_links_contents main_container pt-3 pb-3">
                <div className='sidebar_links_main'>
                    <div className="sidebar_links_logo mb-2">
                        <Link href="/home">
                            <a>
                                <Icon type='logo' color={'bg-primary'} width='34' height='40' />
                            </a>
                        </Link>
                    </div>
                    <div className="sidebar_links_flex1 mb-[4px]">
                        <div className="sidebar_home">
                            <SidebarLink text="Home" Icon={HomeIcon} action={() => goto('/home')} active={setActive(path)} ActiveIcon={HomeIconSolid}
                            fullpath='/home'
                            />
                        </div>
                        <div className="sidebar_explore">
                            <SidebarLink text="Explore" Icon={FireIcon} action={() => goto('/explore')} active={setActive(path)} ActiveIcon={FireIconSolid}
                            fullpath='/explore'
                            />
                        </div>
                        <div className="sidebar_jobs">
                            <SidebarLink text="Jobs" Icon={BriefcaseIcon} action={() => goto('/jobs')} active={setActive(path)} ActiveIcon={BriefcaseSolid}
                            fullpath='/jobs'
                            />
                        </div>
                        <div className="sidebar_messages">
                            <SidebarLink text="Messages" Icon={InboxIcon} action={() => goto('/messages')} active={setActive(path)} ActiveIcon={InboxIconSolid}
                            fullpath='/messages'
                            />
                        </div>
                        <div className="sidebar_saved">
                            <SidebarLink text="Saved" Icon={BookmarkIcon} action={() => goto('/saved')} active={setActive(path)} ActiveIcon={BookmarkSolid}
                            fullpath='/saved'
                            />
                        </div>
                        <div className="sidebar_profile">
                            <SidebarLink text="Profile" Icon={UserIcon} action={() => goto('/profile')} active={setActive(path)} ActiveIcon={UserSolid}
                            fullpath='/profile'
                            />
                        </div>
                        <div className="sidebar_more">
                            <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} action={() => goto('/m/cnts')} active={setActive(path)} ActiveIcon={PlusIcon}
                            fullpath='/m/cnts'
                            />
                        </div>
                    </div>
                    <div className="sidebar_links_flex2 mt-2 sidebar_post_button w-[98%] m-auto">
                        <PrimaryButton styles={'sidebar_post_button_lg animationScaleup bg-primary w-full -ml-3 py-3 rounded-full text-white text-lg font-semibold screen-sm:hidden'}>
                            <span className='s_p_b_text'>Post</span>
                            <span className='s_p_b_icon_lg hidden'>
                                <PlusIcon className='ml-auto mr-auto text-white' width={24} />
                            </span>
                        </PrimaryButton>
                        <PrimaryButton styles={'sidebar_post_button_mb animationScaleup w-12 h-12 fixed bottom-4 right-4 z-50 shadow-lg hidden screen-sm:block'}
                            action={showPostTextBox}
                        >
                            <span className='s_p_b_icon'>
                                <PlusIcon className='ml-auto mr-auto text-white' width={20} />
                            </span>
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar