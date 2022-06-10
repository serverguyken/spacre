import { User } from '../interface/User'
import { setClass, generateFirstWord } from '../utils'
import { UserIcon, UserCircleIcon } from '@heroicons/react/solid'
const ProfileImage = ({ user, width, height, styles }: {
    user: User | any;
    width?: string;
    height?: string;
    styles?: {
        imgRoot?: string;
        img?: {
            width?: string;
            height?: string;
            border?: string;
        };
    };
}) => { 
    if (user.profileImage) {
        return (
            <div className={setClass('rounded-full select-none ', width ? width : 'w-9', height ? height : 'h-9')}>
                <img className={setClass('rounded-full', width ? width : 'w-9', height ? height : 'h-9', styles?.img?.border ? styles.img.border : '')} src={user.profileImage} alt={user.userName} />
            </div>
        )
    } else {
        return (
            <div className={setClass('profile_image_avatar bg-gray-200 relative flex justify-center items-center rounded-full select-none', width ? width : 'w-9', height ? height : 'h-9')}
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