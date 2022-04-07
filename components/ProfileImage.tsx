import { User } from '../interface/User'
import { generateFirstWord } from '../utils'
import { UserIcon, UserCircleIcon } from '@heroicons/react/solid'
const ProfileImage = ({ user }: {
    user: User | any
}) => { 
    if (user.profileImage) {
        return (
            <div className='w-10 h-10 rounded-full select-none'>
                <img className='w-10 h-10 rounded-full' src={user.profileImage} alt={user.userName} />
            </div>
        )
    } else {
        return (
            <div className='bg-gray-200 relative w-10 h-10 flex justify-center items-center rounded-full select-none'>
                <UserIcon width={'29'} height={'29'} className='text-gray-400' />
            </div>
        )
    }
}

export default ProfileImage