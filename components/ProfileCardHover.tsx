import ProfileImage from "./ProfileImage";
import { DefaultButton } from "./Buttons";
import Icon from "./Icon";
import Link from "next/link";
import { toHTML, print, TimeOut, setClass } from "../utils";
import { ToJSX } from "../utils/render";
const pocStyle = (cls: string) => {
    return `poc_${cls}`
}
const ProfileCardHover = ({
    user,
}: {
    user: any
}) => {
    return (
        <div className="bg-white dark:bg-darkMode dark:border-blue-50 dark:border-opacity-20 border border-gray-100 shadow-xl dark:shadow-2xl dark:ring-1 dark:ring-white dark:ring-opacity-20 rounded-lg pt-3 p-2 pb-3 max-w-[320px] max-h-[380px] overflow-auto"
            onClick={() => {
                console.log(user)
            }}
        >
            <div className={pocStyle("profile")}>
                <div className="flex justify-between space-x-2">
                    <div className={pocStyle("profile_contents")}>
                        <div className={pocStyle("profile_user_img")}>
                            <ProfileImage user={user} width={'w-16'} height={'h-16'} />
                        </div>
                        <div className="flex mt-1">
                            <div className={pocStyle("profile_fullname font-semibold whitespace-nowrap max-w-[10rem] text-ellipsis overflow-hidden hover:underline")}>
                                <Link href={`/${user.userName}`}>

                                    <a>{user.fullName}</a>
                                </Link>

                            </div>
                            {
                                user.isVerified && <div className='mt-1'>
                                    <Icon type="verified" />
                                </div>
                            }
                        </div>
                        <div className={pocStyle("profile_username text-dimGray dark:text-darkText text-sm whitespace-nowrap max-w-[10rem] text-ellipsis overflow-hidden hover:underline")}>
                            <Link href={`/${user.userName}`}>

                                <a>@{user.userName}</a>
                            </Link>
                        </div>
                    </div>
                    <div className={pocStyle("profile_follow")}>
                        <div className={pocStyle("profile_follow_btn")}>
                            {
                                user.isFollowing ?
                                    <DefaultButton text="Following" styles={setClass('bg-black border-radius-main dark:bg-darkMode dark:border dark:border-gray-50 dark:border-opacity-30 dark:hover:bg-gray-50 dark:hover:bg-opacity-10 text-white py-2 px-4')} />

                                    :
                                    <DefaultButton text="Follow" styles={setClass('bg-black border-radius-main dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white py-2 px-4')} />
                            }

                        </div>
                    </div>
                </div>
                <div className={pocStyle("profile_bio mt-[0.50rem] mb-2 text-sm max-w-[26rem]")}>
                    <ToJSX text={user.bio} />
                </div>
                <div className={pocStyle("profile_fw_fl_count text-[16px]")}>
                    <div className="flex space-x-4">
                        <div className={pocStyle("profile_fl_count flex space-x-1")}>
                            <span className="font-semibold">{user.followingCount}</span>
                            <span className="dark:text-darkText">Following</span>
                        </div>
                        <div className={pocStyle("profile_fw_count flex space-x-1")}>
                            <span className="font-semibold">{user.followersCount}</span>
                            <span className="dark:text-darkText">Followers</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfileCardHover;