import ProfileImage from "./ProfileImage";
import { DefaultButton } from "./Buttons";
import Icon from "./Icon";
import Link from "next/link";
import { setClass, isFollowing, countSet, stopPropagation } from "../utils";
import { ToJSX } from "../utils/render";
import { useEffect, useState } from "react";
import { Reply, Space, User } from "../interface/User";
import { createCollectionRef, createDocRef, OnSnapshot } from "../config/auth/firebase";
const pocStyle = (cls: string) => {
  return `poc_${cls}`;
};
const ProfileCardHover = ({
  users,
  currentUser,
  user,
  space,
  renderType,
  onFollow,
  onUnFollow,
}: {
  users: User[];
  currentUser: User;
  user: User;
  space: Space | Reply;
  renderType: "space" | "reply";
  onFollow: (user: User) => void;
  onUnFollow: (user: User) => void;
}) => {
  const [unfollowHovered, setUnfollowHovered] = useState(false);
  const [usersDB, setUsersDB] = useState<User[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [userDB, setUserDB] = useState<User>({} as User);
  useEffect(() => {
    const ref = createCollectionRef("users");
    OnSnapshot(ref, (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => doc.data() as User);
      setUsersDB(fetchedUsers);
    });
  }, []);
  useEffect(() => {
    if (user && user.uid) {
      const ref = createDocRef("users", user.uid);
      OnSnapshot(ref, (snapshot) => {
        const fetchedUser = snapshot.data() as User;
        setUserDB(fetchedUser);
      });
    }
  }, []);
  useEffect(() => {
    if (usersDB !== undefined && userDB !== undefined) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [usersDB]);


  return (
    <>
      {loaded && (
        <div className="bg-white dark:bg-darkMode dark:border-none border border-gray-100 shadow-xl dark:shadow-profileCardHover rounded-lg pt-3 p-2 pb-3 w-[300px] max-w-[340px] max-h-[300px] overflow-auto cursor-auto">
          <div className={pocStyle("profile")}>
            <div className="flex justify-between space-x-2">
              <div className={pocStyle("profile_contents")}>
                <div className={pocStyle("profile_user_img")}>
                  <ProfileImage user={userDB} width={"w-14"} height={"h-14"} />
                </div>
                <div className="flex mt-1">
                  <div
                    className={pocStyle(
                      "profile_fullname font-semibold whitespace-nowrap max-w-[10rem] text-ellipsis overflow-hidden hover:underline"
                    )}
                  >
                    <Link href={`/${userDB.userName}`}>
                      <a>{userDB.userName}</a>
                    </Link>
                  </div>
                  {userDB.verified && (
                    <div className="mt-1">
                      <Icon type="verified" />
                    </div>
                  )}
                </div>
                <div
                  className={pocStyle(
                    "profile_username text-dimGray dark:text-darkText text-sm whitespace-nowrap max-w-[10rem] text-ellipsis overflow-hidden hover:underline"
                  )}
                >
                  <Link href={`/${userDB.userName}`}>
                    <a>@{userDB.userName}</a>
                  </Link>
                </div>
              </div>
              {
                usersDB.filter((u) => u.uid === space.userId)[0] !== undefined && (
                  <>
                    {usersDB.filter((u) => u.uid === space.userId)[0].uid !== currentUser.uid && (

                      <div className={pocStyle("profile_follow")}>
                        <div className={pocStyle("profile_follow_btn")}>
                          {isFollowing(
                            usersDB.filter((u) => u.uid === space.userId)[0]
                              .followers,
                            currentUser
                          ) ? (
                            <div>
                              {unfollowHovered ? (
                                <button
                                  id={`${userDB.userName}_poc_fw_btn_hdn`}
                                  className={setClass(
                                    " bg-primary bg-opacity-10 text-blue-500 border border-primary border-radius-main py-1 px-[1.14rem]"
                                  )}
                                  onMouseOver={() => {
                                    setUnfollowHovered(true);
                                  }}
                                  onMouseLeave={() => {
                                    setUnfollowHovered(false);
                                  }}
                                  onClick={(e: any) => {
                                    stopPropagation(e);
                                    onUnFollow(userDB);
                                  }}
                                >
                                  <span className="font-medium text-sm text-center">
                                    Unfollow
                                  </span>
                                </button>
                              ) : (
                                <button
                                  id={`${userDB.userName}_poc_fw_btn_shw`}
                                  className={setClass(
                                    "bg-white dark:bg-darkMode dark:border-white dark:border-opacity-20 dark:text-white text-black border border-gray-300 border-radius-main py-1 px-4"
                                  )}
                                  onMouseOver={() => {
                                    setUnfollowHovered(true);
                                  }}
                                  onMouseLeave={() => {
                                    setUnfollowHovered(false);
                                  }}
                                >
                                  <span className="font-medium text-sm text-center">
                                    Following
                                  </span>
                                </button>
                              )}
                            </div>
                          ) : (
                            <DefaultButton
                              text="Follow"
                              styles={setClass(
                                "poc_fl_btn bg-black black_bg_transition border-radius-main dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white py-[0.36rem] px-4"
                              )}
                              action={(e: any) => {
                                stopPropagation(e);
                                onFollow(userDB);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
            </div>
            <div
              className={pocStyle(
                "profile_bio mt-[0.50rem] mb-2 text-[0.90rem] max-w-[26rem]"
              )}
              onClick={(e: any) => {
                stopPropagation(e);
              }}
            >
              <ToJSX text={userDB.bio === null || userDB.bio === undefined ? "" : userDB.bio} />
            </div>
            <div className={pocStyle("profile_sp_fw_fl_count text-[16px]")}>
              <div className="flex space-x-4">
                <div
                  className={pocStyle(
                    "profile_spc_count text-sm hover:underline cursor-pointer"
                  )}
                >
                  <Link href={`/${userDB.userName}`}>
                    <a>
                      <span className="font-bold">{userDB.spacesCount}</span>{" "}
                      Spaces
                    </a>
                  </Link>
                </div>
                <div
                  className={pocStyle(
                    "profile_fl_count text-sm hover:underline cursor-pointer"
                  )}
                >
                  <Link href={`/${userDB.userName}/following`}>
                    <a>
                      <span className="font-bold">
                        {countSet(userDB.followingsCount, true, 2).value}
                      </span>{" "}
                      Following
                    </a>
                  </Link>
                </div>
                <div
                  className={pocStyle(
                    "profile_fw_count text-sm hover:underline cursor-pointer"
                  )}
                >
                  <Link href={`/${userDB.userName}/followers`}>
                    <a>
                      <span className="font-bold">
                        {countSet(userDB.followersCount, true, 2).value}
                      </span>{" "}
                      Followers
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCardHover;
