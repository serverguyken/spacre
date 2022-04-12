import { User } from '../interface/User'
import { generateFirstWord } from '../utils'
import { UserIcon, UserCircleIcon } from '@heroicons/react/solid'
const ProfileImage = ({ user }: {
    user: User | any
}) => { 
    if (user.profileImage) {
        return (
            <div className='w-9 h-9 rounded-full select-none'>
                <img className='w-9 h-9 rounded-full' src={user.profileImage} alt={user.userName} />
            </div>
        )
    } else {
        return (
            <div className='profile_image_avatar bg-gray-200 relative w-9 h-9 flex justify-center items-center rounded-full select-none'
                style={{
                    backgroundImage: `url("https://sfsfiles.spacre.com/profile/f5dde43b-a991-43bb-854d-fa41ad9fc4f6_user.png")`,
                    backgroundSize: 'cover'
                }}
            >

            </div>
        )
    }
}

export default ProfileImage