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
            <a className="flex justify-start space-x-3">
                <div className={`home_sidebar_link select-none text-[#d9d9d9] flex justify-start items-center text-lg space-x-3 animationHover py-3 px-3 -ml-3 cursor-pointer hover:bg-light dark:hover:bg-darkModeBg`} onClick={action}>
                    <div>
                        {
                            setActive(text) ? <Link href={fullpath}><a><ActiveIcon className='text-primary w-7 h-7' /></a></Link> : <Link href={fullpath}>
                                <a><Icon className='text-black dark:text-white  w-7 h-7 ' /></a>
                            </Link>
                        }
                    </div>
                    {
                        setActive(text) ? <span className={'sidebar_link_text text-black dark:text-white font-semibold text-lg screen-md:text-sm'}>{text}</span> : <span className={'sidebar_link_text text-black dark:text-white font-normal text-lg screen-md:text-sm'}>{text}</span>
                    }
                </div>
            </a>
        </Link>
    )
}

export default SidebarLink