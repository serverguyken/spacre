import { setClass } from "../utils"
import { useRouter } from "next/router"
import { isBrowser } from "../utils"
import Link from "next/link"
const SidebarLink = ({ text, Icon, fullpath, ActiveIcon, action, active }: {
    text: string,
    Icon: any,
    fullpath: string
    ActiveIcon: any,
    action: any,
    active?: boolean
}) => {
    const router = useRouter()
    const setActive = (path: string) => {
        if (isBrowser() && router.pathname && router.pathname.split('/')[1] === path.toLowerCase()) {
            return true
        }
        return false
    }
    return (
        <Link href={fullpath}>
            <a className={setClass(`${text}_sidebar_link_item`,"main_sidebar_links flex justify-start space-x-3")}>
                <div className="relative">
                    <div className={setClass("main_sidebar_links_contents select-none text-[#d9d9d9] flex justify-start items-center text-lg space-x-3 animationHover py-3 px-3 -ml-3 cursor-pointer hover:bg-light dark:hover:bg-darkModeBg")} onClick={action}>
                        <div>
                            {
                                setActive(text) ? <ActiveIcon className='text-primary w-7 h-7' /> :<Icon className='text-black dark:text-white  w-7 h-7' />
                            }
                        </div>
                        {
                            setActive(text) ? <span className={'sidebar_link_text text-black dark:text-white font-semibold text-lg screen-md:text-sm'}>{text}</span> : <span className={'sidebar_link_text text-black dark:text-white font-normal text-lg screen-md:text-sm'}>{text}</span>
                        }
                    </div>
                    <div className={setClass(`${text}_sidebar_tooltip`,"main_sidebar_tooltip invisible opacity-0 absolute top-14 z-[50] bg-gray-500 dark:bg-black dark:text-white p-1 text-center text-xs text-white rounded shadow-sm", text === "Messages" ? 'w-[4.5rem]' : 'w-[3.5rem]', text === "Messages" ? '-left-5' : '-left-3')}>
                        <div className="sidebar_tooltip_content">
                            {text}
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default SidebarLink