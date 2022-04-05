import { User } from '../interface/User'
import { generateFirstWord } from '../utils'
const ProfileImage = ({ user }: {
    user: User | any
}) => { 
    if (user.profileImage) {
        return (
            <div className='w-8 h-8 rounded-full select-none'>
                <img className='w-8 h-8 rounded-full' src={user.profileImage} alt={user.userName} />
            </div>
        )
    } else {
        return (
            <div className='bg-blue-700 w-8 h-8 flex justify-center items-center rounded-full select-none'>
                <span className='text-white text-lg -mt-1'>{generateFirstWord(user.userName)}</span>
            </div>
        )
    }
}

export default ProfileImage