import { User } from "../interface/User"
import { generateFirstWord } from "../utils"
import { ChevronDownIcon } from '@heroicons/react/outline'
import { setClass } from "../utils"
const HeaderProfileCard = ({ user, signout, isHover }: {
    user: User | any,
    signout: () => void,
    isHover: boolean
}) => {
    return (
        <div className={setClass('header_user_profile cursor-pointer', isHover ? 'hover:bg-gray-100 px-4 py-1 rounded-full dark:hover:bg-darkModeBg' : '')}>
            <div className='header_user_profile_image flex items-center'>
                {/* <Image src={user.image} width='32' height='32' alt={user.name} className="rounded-full" /> */}
                <div className='bg-blue-700 w-8 h-8 flex justify-center items-center rounded-full'>
                    <span className='text-white text-lg -mt-1'>{generateFirstWord(user.userName)}</span>
                </div>
                <div className='ml-2 header_user_profile_details'>
                    <h3 className='text-black dark:text-white text-sm font-semibold'>{user.userName}</h3>
                    <h3 className='text-dimGray  text-xs'>@{user.userName}</h3>
                </div>
                <div className='ml-2 header_user_profile_details_icon'>
                    <ChevronDownIcon width='16' height='16' className='text-gray-500 dark:text-white' />
                </div>
            </div>
        </div>
    )
}

export default HeaderProfileCard