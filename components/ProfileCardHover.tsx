import ProfileImage from "./ProfileImage";
import { DefaultButton } from "./Buttons";
import Icon from "./Icon";
import Link from "next/link";
import { toHTML, print, TimeOut, setClass, isBrowser } from "../utils";
import { ToJSX } from "../utils/render";
import { useState } from "react";
const pocStyle = (cls: string) => {
    return `poc_${cls}`
}
const ProfileCardHover = ({
    user,
}: {
    user: any
    }) => {
    const [unfollowHovered, setUnfollowHovered] = useState(false);
    

    return (
        <div className="bg-white dark:bg-darkMode dark:border-none border border-gray-100  shadow-xl dark:shadow-profileCardHover rounded-lg pt-3 p-2 pb-3 w-[300px] max-w-[340px] max-h-[270px] overflow-auto cursor-auto"
        >
            <div className={pocStyle("profile")}>
                <div className="flex justify-between space-x-2">
                    <div className={pocStyle("profile_contents")}>
                        <div className={pocStyle("profile_user_img")}> 
                            <ProfileImage user={user} width={'w-14'} height={'h-14'} />
                        </div>
                        <div className="flex mt-1">
                            <div className={pocStyle("profile_fullname font-semibold whitespace-nowrap max-w-[10rem] text-ellipsis overflow-hidden hover:underline")}>
                                <Link href={`/${user.userName}`}>

                                    <a>{user.displayName}</a>
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
                                    <div>
                                        {
                                            unfollowHovered ? <button id={`${user.userName}_poc_fw_btn_hdn`} className={setClass(' bg-primary bg-opacity-10 text-blue-500 border border-primary border-radius-main py-1 px-[1.14rem]')}
                                                onMouseOver={() => {
                                                    setUnfollowHovered(true);
                                                }}
                                                onMouseLeave={() => {
                                                    setUnfollowHovered(false);
                                                }}
                                                onClick={() => {
                                                    console.log(`unfollowing ${user.userName}`)
                                                }}
                                            >
                                                <span className="font-medium text-sm text-center">Unfollow</span>
                                            </button>
                                                :

                                                <button id={`${user.userName}_poc_fw_btn_shw`} className={setClass('bg-white dark:bg-darkMode dark:border-white dark:border-opacity-20 dark:text-white text-black border border-gray-300 border-radius-main py-1 px-4')}
                                                    onMouseOver={() => {
                                                        setUnfollowHovered(true);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setUnfollowHovered(false);
                                                    }}
                                                >
                                                    <span className="font-medium text-sm text-center">Following</span>
                                                </button>

                                         }
                                        
                                    </div>

                                    :
                                    <DefaultButton text="Follow" styles={setClass('poc_fl_btn bg-black black_bg_transition border-radius-main dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white py-[0.36rem] px-4')} />
                            }

                        </div>
                    </div>
                </div>
                <div className={pocStyle("profile_bio mt-[0.50rem] mb-2 text-[0.90rem] max-w-[26rem]")}>
                    <ToJSX text={user.bio} />
                </div>
                <div className={pocStyle("profile_sp_fw_fl_count text-[16px]")}>
                    <div className="flex space-x-4">
                        <div className={pocStyle("profile_spc_count text-sm hover:underline cursor-pointer")}>
                            <Link href={`/${user.userName}/spaces`}>
                                <a>
                                    <span className="font-bold">{user.spacesCount}</span> Spaces
                                </a>
                            </Link>
                        </div>
                        <div className={pocStyle("profile_fl_count text-sm hover:underline cursor-pointer")}>
                            <Link href={`/${user.userName}/following`}>
                                <a>
                                    <span className="font-bold">{user.followingCount}</span> Following
                                </a>
                            </Link>
                        </div>
                        <div className={pocStyle("profile_fw_count text-sm hover:underline cursor-pointer")}>
                            <Link href={`/${user.userName}/followers`}>
                                <a>
                                    <span className="font-bold">{user.followersCount}</span> Followers
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfileCardHover;