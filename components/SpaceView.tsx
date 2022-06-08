import {
  AnnotationIcon,
  DotsHorizontalIcon,
  HeartIcon,
  BookmarkIcon as SaveIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as SaveIconSolid,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createDocRef, OnSnapshot } from "../config/auth/firebase";
import { Constructor, Likes, Poll, Reply, Space, User } from "../interface/User";
import useUserContext from "../provider/userProvider";
import store from "../store";
import {
  countSet,
  formatDate,
  isBrowser,
  isFollowing,
  isLiked,
  isSaved,
  setClass,
  stopPropagation,
  TimeOut,
} from "../utils";
import { LineLoader } from "../utils/loader";
import { ToJSX } from "../utils/render";
import Icon from "./Icon";
import MetaCard from "./MetaCard";
import PollCard from "./PollCard";
import ProfileCardHover from "./ProfileCardHover";
import ProfileImage from "./ProfileImage";
import RenderMoreAction from "./RenderMoreAction";
import ReplyEditor from "./ReplyEditor";
import Tooltip from "./Tooltip";
import Transition from "./Transition";
const SpaceView = ({
  user,
  spaceID,
  users,
}: {
  user: User;
  spaceID: any;
  users: User[];
}) => {
  const currentUser = useUserContext().user;
  const { authUser, updateSpace, updateUser } = useUserContext();
  const [openReplyEditor, setOpenReplyEditor] = useState(false);
  const router = useRouter();
  useEffect(() => { }, [authUser]);

  const [space, setSpace] = useState<Space | any>({});
  const [replies, setReplies] = useState<Reply[]>([]);
  const [popupCard, setPopupCard] = useState(false);
  const [popupMsg, setPopUpMsg] = useState("");
  const [replySent, setReplySent] = useState(false);
  useEffect(() => {
    const ref = createDocRef("spaces", spaceID);
    OnSnapshot(ref, (data: any) => {
      const fecthedSpace = { ...data.data() };
      setSpace(fecthedSpace);
    });
  }, []);
  useEffect(() => {
    if (Object.keys(space).length > 0) {
      setReplies(space.replies);
    }
  }, [space]);

  const likeHandler = (id: string) => {
    const like_count = document.getElementById(`${id}_like_count`);
    if (isLiked(space.likes, currentUser)) {
      // remove like
      const newSpace = {
        ...space,
        likes: space.likes.filter((l: Constructor) => l.userId !== currentUser.uid),
      };
      updateSpace(space.spaceId, newSpace, {
        onSuccess: () => {
          if (like_count) {
            setTimeout(() => {
              like_count.classList.add("like_count_animation");
            }, 500);
          }
          setTimeout(() => {
            if (like_count) {
              like_count.classList.remove("like_count_animation");
            }
          }, 1000);
        },
        onError: (err: any) => { },
      });
    } else {
      // update space
      const newSpace = {
        ...space,
        likes: [...space.likes, { userId: currentUser.uid }],
      };
      updateSpace(space.spaceId, newSpace, {
        onSuccess: () => {
          if (like_count) {
            setTimeout(() => {
              like_count.classList.add("like_count_animation");
            }, 500);
          }
          setTimeout(() => {
            if (like_count) {
              like_count.classList.remove("like_count_animation");
            }
          }, 1000);
        },
        onError: (err: any) => { },
      });
    }
  };
  const likeReplyHandler = (id: string) => {
    // update space reply likes
    const like_count = document.getElementById(`${id}_like_count`);
    const reply = replies.find((r: Reply) => r.replyId === id) as Reply;
    if (reply && reply !== undefined) {
      if (isLiked(reply.likes, currentUser)) {
        // remove like
        const newSpace = {
          ...space,
          replies: space.replies.map((r: Reply) => {
            if (r.replyId === id) {
              r.likes = r.likes.filter((l: Likes) => l.userId !== currentUser.uid);
            }
            return r;
          }),
        };
        updateSpace(space.spaceId, newSpace, {
          onSuccess: () => {
            if (like_count) {
              setTimeout(() => {
                like_count.classList.add("like_count_animation");
              }, 500);
            }
            setTimeout(() => {
              if (like_count) {
                like_count.classList.remove("like_count_animation");
              }
            }, 1000);
          },
          onError: (err: any) => { },
        });
      } else {
        // update space
        const newSpace = {
          ...space,
          replies: space.replies.map((r: Reply) => {
            if (r.replyId === id) {
              r.likes = [...r.likes, { userId: currentUser.uid }];
            }
            return r;
          }),
        };
        updateSpace(space.spaceId, newSpace, {
          onSuccess: () => {
            if (like_count) {
              setTimeout(() => {
                like_count.classList.add("like_count_animation");
              }, 500);
            }
            setTimeout(() => {
              if (like_count) {
                like_count.classList.remove("like_count_animation");
              }
            }, 1000);
          },
          onError: (err: any) => { },
        });
      }
    }
  };
  const saveHandler = (space: Space) => {
     if (isSaved(space.spaceId, currentUser)) {
       // remove saved space
        const newUser = {
          ...currentUser,
          saves: currentUser.saves.filter((s) => s.spaceId !== space.spaceId),
        };
        updateUser(currentUser.uid, newUser, {
          onSuccess: () => {
          },
          onError: (err: any) => {},
        });
     } else {
        // add saved space
          const newUser = {
            ...currentUser,
            saves: [...currentUser.saves, { spaceId: space.spaceId }],
          };
          updateUser(currentUser.uid, newUser, {
            onSuccess: () => {
            },
            onError: (err: any) => {},
          });
      }
  }
  const onFollow = (user: User) => {
    const forUser = {
      ...user,
      followers: [...user.followers, { userId: currentUser.uid }],
      followersCount: user.followersCount + 1,
    };
    const forCurrentUser = {
      ...currentUser,
      following: [...currentUser.following, { userId: user.uid }],
      followingsCount: currentUser.followingsCount + 1,
    };
    // if current user is following the user
    if (isFollowing(currentUser.following, user)) {
      return;
    } else {
      updateUser(user.uid, forUser, {
        onSuccess: () => {
          updateUser(currentUser.uid, forCurrentUser, {
            onSuccess: () => {
            },
            onError: (err: any) => { },
          });
        },
        onError: (err: any) => { },
      });
    }
  };
  const onUnFollow = (user: User) => {
    const forUser = {
      ...user,
      followers: user.followers.filter((f: Constructor) => f.userId !== currentUser.uid),
      followersCount: user.followersCount - 1,
    };
    const forCurrentUser = {
      ...currentUser,
      following: currentUser.following.filter((f: Constructor) => f.userId !== user.uid),
      followingsCount: currentUser.followingsCount - 1,
    };
    if (!isFollowing(currentUser.following, user)) {
      return;
    } else {
      updateUser(user.uid, forUser, {
        onSuccess: () => {
          updateUser(currentUser.uid, forCurrentUser, {
            onSuccess: () => { },
            onError: (err: any) => { },
          });
        },
        onError: (err: any) => { },
      });
    }
  };
  const setPopUp = (show: boolean, msg: string) => {
    setPopupCard(show);
    setPopUpMsg(msg);
  };
  const setPopUpTimeout = (timeout: number) => {
    TimeOut(() => {
      setPopUp(false, "");
    }, timeout);
  };
  const onReply = (reply: Reply, cbs: {
    onSuccess: () => void;
    onError: (err: any) => void;
  }) => {
    const newSpace = {
      ...space,
      replies: [...space.replies, reply],
    };

    updateSpace(space.spaceId, newSpace, {
      onSuccess: () => {
        setReplySent(true);
        setOpenReplyEditor(false);
        setPopUp(true, "Reply sent successfully");
        setPopUpTimeout(2000);
        TimeOut(() => {
          setReplySent(false);
        }, 1000);
        cbs.onSuccess();
      },
      onError: (err: any) => {
        setReplySent(false);
        setPopUp(true, "Error sending reply");
        setPopUpTimeout(2000);
        cbs.onError(err);
      },
    });
  };
  const isDataLoaded = () => {
    if (user && user.uid && space && space.spaceId && users) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      {isDataLoaded() && (
        <div>
          <div
            key={space.spaceId}
            id={`${space.spaceId}_profile_feed_view`}
            className="bg-white dark:bg-darkMode relative  whitespace-pre-wrap feed_post_contents_card pt-3 h-auto p-2  border-b border-gray-100  dark:border-borderDarkMode"
          >
            <div className="flex justify-between">
              <div className="flex space-x-2 w-full">
                <div className="profile_image mt-1">
                  <Link href={`/${space.userName}`}>
                    <a>
                      <ProfileImage user={user} />
                    </a>
                  </Link>
                </div>
                <div className="profile_name_post_feed w-full -mt-1 pl-[10px] pr-[10px]">
                  <div className="profile_name w-full">
                    <div className="flex justify-between">
                      <div className="profile_names_content w-full">
                        <div className="profile_name_link relative max-w-[16rem] inline-block">
                          <div className="flex items-center">
                            <div
                              className="whitespace-nowrap max-w-[16rem] text-ellipsis overflow-hidden hover:underline"
                              onMouseOver={() => {
                                // change position of the hover card based on view height
                                const profile_feed_view =
                                  document.getElementById(
                                    `${space.spaceId}_profile_feed_view`
                                  ) as HTMLDivElement;
                                const profile_hover_card =
                                  document.getElementById(
                                    `${space.spaceId}_profile_hover_card`
                                  ) as HTMLDivElement;
                                const windowHeight = window.innerHeight;
                                const profileFeedViewHeight =
                                  windowHeight -
                                  profile_feed_view.getBoundingClientRect().top;
                                const top_bottom_position =
                                  profileFeedViewHeight > 300
                                    ? "bottom"
                                    : "top";
                                if (top_bottom_position === "bottom") {
                                  profile_hover_card.classList.remove(
                                    "bottom-6"
                                  );
                                  profile_hover_card.classList.add("top-6");
                                } else {
                                  profile_hover_card.classList.remove("top-6");
                                  profile_hover_card.classList.add("bottom-6");
                                }
                              }}
                            >
                              <Link href={`/${space.userName}`}>
                                <a className="font-semibold feed_user_profile_name">
                                  {space.displayName}
                                </a>
                              </Link>
                            </div>
                            {user.verified && (
                              <div className="mt-1">
                                <Icon type="verified" />
                              </div>
                            )}
                          </div>
                          <div
                            id={`${space.spaceId}_profile_hover_card`}
                            className="profile_hover_card absolute pt-2 z-40  -left-14 w-auto hidden invisible opacity-0"
                          >
                            <ProfileCardHover
                              users={users}
                              currentUser={currentUser}
                              user={
                                users.filter(
                                  (u: User) => u.uid === space.userId
                                )[0]
                              }
                              space={space}
                              renderType="space"
                              onFollow={onFollow}
                              onUnFollow={onUnFollow}
                            />
                          </div>
                        </div>
                        <div className="profile_username_post_timestamp flex items-center">
                          <div className="profile_username whitespace-nowrap max-w-[16rem] text-ellipsis overflow-hidden">
                            <Link href={`/${space.userName}`}>
                              <a className="text-sm text-dimGray dark:text-darkText">
                                @{space.userName}
                              </a>
                            </Link>
                          </div>
                          <p className="before:content-['•'] before:text-[12px] before:ml-[4px] before:mr-[4px] -mt-1 before:dark:text-gray-50 before:dark:text-opacity-30"></p>
                          <Tooltip
                            title={formatDate(space.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                            placement="center"
                            position="bottom"
                            transition="fade"
                            transitionDuration={200}
                            classNames={{
                              body: setClass(
                                "tooltip_comp -mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
                                `${formatDate(space.createdAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                ) == ""
                                  ? "hidden"
                                  : ""
                                }`
                              ),
                            }}
                            color="gray"
                          >
                            <p className="text-sm text-dimGray hover:underline">
                              {formatDate(space.createdAt).startOf("h")}
                            </p>
                          </Tooltip>
                        </div>
                      </div>
                      <div
                        className="post_more_action relative cursor-pointer"
                        onClick={(e: any) => {
                          stopPropagation(e);
                          const post_more_actions = document.getElementById(
                            `${space.spaceId}_post_more_actions`
                          ) as HTMLDivElement;
                          post_more_actions.classList.toggle("hidden");
                          const other_post_more_actions =
                            document.querySelectorAll(
                              ".post_more_actions"
                            ) as NodeListOf<HTMLDivElement>;
                          for (
                            let i = 0;
                            i < other_post_more_actions.length;
                            i++
                          ) {
                            if (
                              other_post_more_actions[i].id !==
                              `${space.spaceId}_post_more_actions`
                            ) {
                              other_post_more_actions[i].classList.add(
                                "hidden"
                              );
                            }
                          }
                        }}
                      >
                        <div className="text-gray-500 dark:text-darkText hover:bg-primary hover:bg-opacity-10 hover:text-primary rounded-full w-8 h-8 flex justify-center items-center">
                          <Tooltip
                            title="More"
                            placement="center"
                            position="bottom"
                            transition="fade"
                            transitionDuration={200}
                            classNames={{
                              body: "tooltip_comp mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
                            }}
                            color="gray"
                          >
                            <DotsHorizontalIcon width={20} />
                          </Tooltip>
                        </div>
                        <div
                          className="post_more_actions absolute top-0 right-0 mt-10 hidden select-none z-20"
                          id={`${space.spaceId}_post_more_actions`}
                        >
                          <RenderMoreAction
                            user={currentUser}
                            users={users}
                            space={space}
                            renderType="space"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="post_feed_contents mt-2 leading-[19px]">
                    <div className="post_contents w-full">
                      <ToJSX text={space.text} />
                      {space.images && (
                        <div className="mt-4 max-w-[400px]">
                          {space.images.map((url: string) => {
                            return (
                              <img
                                key={space.spaceId}
                                src={url}
                                alt="A post image"
                                className="rounded-lg max-w-[400px] max-h-[300px] object-cover object-center"
                              />
                            );
                          })}
                        </div>
                      )}
                      {space.hasPoll && (
                        <div className="mt-5">
                          <PollCard
                            poll={space.poll}
                            events={{
                              stopPropagation: true,
                              onVote: (
                                e: React.MouseEvent<
                                  HTMLButtonElement,
                                  MouseEvent
                                >,
                                selected: {
                                  index: number;
                                  value: string;
                                },
                                poll: Poll
                              ) => {
                                stopPropagation(e);
                                console.log(
                                  "You voted for: ",
                                  selected.value,
                                  poll
                                );
                              },
                            }}
                          />
                        </div>
                      )}
                      {space.meta && (
                        <div className="mt-2 max-w-[400px]">
                          <MetaCard meta={space.meta} />
                        </div>
                      )}
                    </div>
                    <div className="post_user_actions mt-3 pb-1 max-w-[80%]">
                      <div className="flex justify-between items-center">
                        <Tooltip
                          title={`${isLiked(space.likes, currentUser) ? "Unlike" : "Like"
                            }`}
                          placement="center"
                          position="bottom"
                          transition="fade"
                          transitionDuration={200}
                          classNames={{
                            body: "tooltip_comp mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
                          }}
                          color="gray"
                        >
                          <div
                            className={setClass(
                              "post_action post_user_like_action relative select-none flex like_animation items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-salmon hover:bg-opacity-10 hover:text-salmon dark:hover:text-salmon",
                              isLiked(space.likes, currentUser)
                                ? "text-salmon dark:text-salmon"
                                : "text-gray-500  dark:text-darkText"
                            )}
                            onClick={(e: any) => {
                              stopPropagation(e);
                              likeHandler(space.spaceId);
                            }}
                          >
                            {isLiked(space.likes, currentUser) ? (
                              <HeartIconSolid
                                className={"text-salmon"}
                                width={16}
                              />
                            ) : (
                              <HeartIcon width={16} />
                            )}
                            <p
                              className="text-sm"
                              id={`${space.spaceId}_like_count`}
                            >
                              {countSet(space.likes.length, true, 2).value}
                            </p>
                          </div>
                        </Tooltip>
                        <Tooltip
                          title="Reply"
                          placement="center"
                          position="bottom"
                          transition="fade"
                          transitionDuration={200}
                          classNames={{
                            body: "tooltip_comp mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
                          }}
                          color="gray"
                        >
                          <div
                            className="post_action post_user_comment_action relative select-none flex text-gray-500 dark:text-darkText items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-green-600 hover:bg-opacity-10 hover:text-green-600 dark:hover:text-green-600"
                            onClick={(e: any) => {
                              stopPropagation(e);
                              setOpenReplyEditor(true);
                            }}
                          >
                            <AnnotationIcon width={16} />
                            <p className="text-sm">
                              {countSet(space.replies.length, true, 2).value}
                            </p>
                          </div>
                        </Tooltip>
                        <Tooltip
                          title="Share"
                          placement="center"
                          position="bottom"
                          transition="fade"
                          transitionDuration={200}
                          classNames={{
                            body: "tooltip_comp mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
                          }}
                          color="gray"
                        >
                          <div className="post_action post_user_share_action relative select-none flex text-gray-500 dark:text-darkText items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary dark:hover:text-primary">
                            <UploadIcon width={16} />
                            <p className="text-sm">
                              {countSet(space.shares.length, true, 2).value}
                            </p>
                          </div>
                        </Tooltip>
                        <Tooltip
                          title={`${space.saved ? "Unsave" : "Save"}`}
                          placement="center"
                          position="bottom"
                          transition="fade"
                          transitionDuration={200}
                          classNames={{
                            body: "tooltip_comp mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
                          }}
                          color="gray"
                        >
                          <div
                            className="post_action post_user_save_action relative select-none flex text-gray-500 dark:text-darkText items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary dark:hover:text-primary"
                            onClick={(e: any) => {
                              stopPropagation(e);
                              saveHandler(space);
                            }}
                          >
                            {isSaved(space.spaceId, currentUser) ? (
                              <SaveIconSolid
                                className={"text-primary"}
                                width={16}
                              />
                            ) : (
                              <SaveIcon width={16} />
                            )}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <ReplyEditor spaceUser={user} user={currentUser} onReply={onReply} />


          {replies.map((reply: Reply, index: number) => {
            return (
              <div
                key={reply.replyId}
                id={`${reply.replyId}_profile_feed_view`}
                className="bg-white dark:bg-darkMode  whitespace-pre-wrap feed_post_contents_card pt-3 h-auto p-2  border-b border-gray-100  dark:border-borderDarkMode"
              >
                <div></div>
                <div className="flex justify-between">
                  <div className="flex space-x-2 w-full">
                    <div className="profile_image mt-1">
                      <Link href={`/${space.userName}`}>
                        <a>
                          <ProfileImage
                            user={
                              users.filter((u) => u.uid === reply.userId)[0]
                            }
                          />
                        </a>
                      </Link>
                      {/* {
                        replies.length > 0 && (
                          <div className="reply-line-direction ">
                            <div className="reply-line-direction-inner ml-4 mt-2 h-16 w-1 rounded-full bg-gray-200 dark:bg-darkModeBg"></div>
                          </div>
                        )
                      } */}
                    </div>

                    <div className="profile_name_post_feed w-full -mt-1 pl-[10px] pr-[10px]">

                      <div className="profile_name w-full">
                        <div className="flex justify-between">
                          <div className="profile_names_content w-full">
                            <div className="profile_name_link relative max-w-[16rem] inline-block">
                              <div className="flex items-center">
                                <div
                                  className="whitespace-nowrap max-w-[16rem] text-ellipsis overflow-hidden hover:underline"
                                  onMouseOver={() => {
                                    // change position of the hover card based on view height
                                    const profile_feed_view =
                                      document.getElementById(
                                        `${space.spaceId}_profile_feed_view`
                                      ) as HTMLDivElement;
                                    const profile_hover_card =
                                      document.getElementById(
                                        `${space.spaceId}_profile_hover_card`
                                      ) as HTMLDivElement;
                                    const windowHeight = window.innerHeight;
                                    const profileFeedViewHeight =
                                      windowHeight -
                                      profile_feed_view.getBoundingClientRect()
                                        .top;
                                    const top_bottom_position =
                                      profileFeedViewHeight > 300
                                        ? "bottom"
                                        : "top";
                                    if (top_bottom_position === "bottom") {
                                      profile_hover_card.classList.remove(
                                        "bottom-6"
                                      );
                                      profile_hover_card.classList.add("top-6");
                                    } else {
                                      profile_hover_card.classList.remove(
                                        "top-6"
                                      );
                                      profile_hover_card.classList.add(
                                        "bottom-6"
                                      );
                                    }
                                  }}
                                >
                                  <Link
                                    href={`/${users.filter(
                                      (u) => u.uid === reply.userId
                                    )[0].userName
                                      }`}
                                  >
                                    <a className="font-semibold feed_user_profile_name">
                                      {
                                        users.filter(
                                          (u) => u.uid === reply.userId
                                        )[0].displayName
                                      }
                                    </a>
                                  </Link>
                                </div>
                                {users.filter((u) => u.uid === reply.userId)[0]
                                  .verified && (
                                    <div className="mt-1">
                                      <Icon type="verified" />
                                    </div>
                                  )}
                              </div>
                              <div
                                id={`${reply.replyId}_profile_hover_card`}
                                className="profile_hover_card absolute pt-2 z-40  -left-14 w-auto hidden invisible opacity-0"
                              >
                                <ProfileCardHover
                                  users={users}
                                  currentUser={currentUser}
                                  user={
                                    users.filter(
                                      (u) => u.uid === reply.userId
                                    )[0]
                                  }
                                  space={reply}
                                  renderType="reply"
                                  onFollow={onFollow}
                                  onUnFollow={onUnFollow}
                                />
                              </div>
                            </div>
                            <div className="profile_username_post_timestamp flex items-center">
                              <div className="profile_username whitespace-nowrap max-w-[16rem] text-ellipsis overflow-hidden">
                                <Link
                                  href={`/${users.filter(
                                    (u) => u.uid === reply.userId
                                  )[0].userName
                                    }`}
                                >
                                  <a className="text-sm text-dimGray dark:text-darkText">
                                    @
                                    {
                                      users.filter(
                                        (u) => u.uid === reply.userId
                                      )[0].userName
                                    }
                                  </a>
                                </Link>
                              </div>
                              <p className="before:content-['•'] before:text-[12px] before:ml-[4px] before:mr-[4px] -mt-1 before:dark:text-gray-50 before:dark:text-opacity-30"></p>
                              <Tooltip
                                title={formatDate(reply.createdAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                                placement="center"
                                position="bottom"
                                transition="fade"
                                transitionDuration={200}
                                classNames={{
                                  body: setClass(
                                    "tooltip_comp -mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
                                    `${formatDate(reply.createdAt).format(
                                      "MMMM Do YYYY, h:mm:ss a"
                                    ) == ""
                                      ? "hidden"
                                      : ""
                                    }`
                                  ),
                                }}
                                color="gray"
                              >
                                <p className="text-sm text-dimGray hover:underline">
                                  {formatDate(reply.createdAt).startOf("h")}
                                </p>
                              </Tooltip>
                            </div>
                          </div>
                          <div
                            className="post_more_action relative cursor-pointer"
                            onClick={(e: any) => {
                              stopPropagation(e);
                              const post_more_actions = document.getElementById(
                                `${reply.replyId}_post_more_actions`
                              ) as HTMLDivElement;
                              post_more_actions.classList.toggle("hidden");
                              const other_post_more_actions =
                                document.querySelectorAll(
                                  ".post_more_actions"
                                ) as NodeListOf<HTMLDivElement>;
                              for (
                                let i = 0;
                                i < other_post_more_actions.length;
                                i++
                              ) {
                                if (
                                  other_post_more_actions[i].id !==
                                  `${reply.replyId}_post_more_actions`
                                ) {
                                  other_post_more_actions[i].classList.add(
                                    "hidden"
                                  );
                                }
                              }
                            }}
                          >
                            <div className="text-gray-500 dark:text-darkText hover:bg-primary hover:bg-opacity-10 hover:text-primary rounded-full w-8 h-8 flex justify-center items-center">
                              <Tooltip
                                title="More"
                                placement="center"
                                position="bottom"
                                transition="fade"
                                transitionDuration={200}
                                classNames={{
                                  body: "tooltip_comp mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
                                }}
                                color="gray"
                              >
                                <DotsHorizontalIcon width={20} />
                              </Tooltip>
                            </div>
                            <div
                              className="post_more_actions absolute top-0 right-0 mt-10 hidden select-none z-20"
                              id={`${reply.replyId}_post_more_actions`}
                            >
                              <RenderMoreAction
                                user={currentUser}
                                users={users}
                                space={reply}
                                renderType="reply"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="post_feed_contents mt-2 leading-[19px]">
                        <div className="post_contents w-full">
                          <ToJSX text={reply.text} />
                          {reply.images && (
                            <div className="mt-4 max-w-[400px]">
                              {reply.images.map((url: string) => {
                                return (
                                  <img
                                    key={reply.replyId}
                                    src={url}
                                    alt={`${reply.replyId}_image`}
                                    className="rounded-lg"
                                  />
                                );
                              })}
                            </div>
                          )}
                          {reply.hasPoll && (
                            <div className="mt-5">
                              <PollCard
                                poll={reply.poll}
                                events={{
                                  stopPropagation: true,
                                  onVote: (
                                    e: React.MouseEvent<
                                      HTMLButtonElement,
                                      MouseEvent
                                    >,
                                    selected: {
                                      index: number;
                                      value: string;
                                    },
                                    poll: Poll
                                  ) => {
                                    stopPropagation(e);
                                    console.log(
                                      "You voted for: ",
                                      selected.value,
                                      poll
                                    );
                                  },
                                }}
                              />
                            </div>
                          )}
                          {reply.meta && (
                            <div className="mt-2 max-w-[400px]">
                              <MetaCard meta={reply.meta} />
                            </div>
                          )}
                        </div>
                        <div className="post_user_actions mt-3 pb-1 max-w-[80%]">
                          <div className="flex justify-between items-center">
                            <Tooltip
                              title={`${isLiked(reply.likes, currentUser) ? "Unlike" : "Like"
                                }`}
                              placement="center"
                              position="bottom"
                              transition="fade"
                              transitionDuration={200}
                              classNames={{
                                body: "tooltip_comp mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
                              }}
                              color="gray"
                            >
                              <div
                                className={setClass(
                                  "post_action post_user_like_action relative select-none flex like_animation items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-salmon hover:bg-opacity-10 hover:text-salmon dark:hover:text-salmon",
                                  isLiked(reply.likes, currentUser)
                                    ? "text-salmon dark:text-salmon"
                                    : "text-gray-500  dark:text-darkText"
                                )}
                                onClick={(e: any) => {
                                  stopPropagation(e);
                                  likeReplyHandler(reply.replyId);
                                }}
                              >
                                {isLiked(reply.likes, currentUser) ? (
                                  <HeartIconSolid
                                    className={"text-salmon"}
                                    width={16}
                                  />
                                ) : (
                                  <HeartIcon width={16} />
                                )}
                                <p
                                  className="text-sm"
                                  id={`${reply.replyId}_like_count`}
                                >
                                  {countSet(reply.likes.length, true, 2).value}
                                </p>
                              </div>
                            </Tooltip>
                            {/* <Tooltip
                              title="Reply"
                              placement="center"
                              position="bottom"
                              transition="fade"
                              transitionDuration={200}
                              classNames={{
                                body: "tooltip_comp mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
                              }}
                              color="gray"
                            >
                              <div className="post_action post_user_comment_action relative select-none flex text-gray-500 dark:text-darkText items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-green-600 hover:bg-opacity-10 hover:text-green-600 dark:hover:text-green-600"
                                  onClick={(e: any) => {
                                      stopPropagation(e);
                                      replyHandler(reply.userName, reply.replyId);
                                    }}
                              >
                                <AnnotationIcon width={16} />
                                <p className="text-sm">
                                  {
                                    countSet(space.replies.length, true, 2)
                                      .value
                                  }
                                </p>
                                
                              </div>
                            </Tooltip>
                            <Tooltip
                              title="Share"
                              placement="center"
                              position="bottom"
                              transition="fade"
                              transitionDuration={200}
                              classNames={{
                                body: "tooltip_comp mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
                              }}
                              color="gray"
                            >
                              <div className="post_action post_user_share_action relative select-none flex text-gray-500 dark:text-darkText items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary dark:hover:text-primary">
                                <UploadIcon width={16} />
                                <p className="text-sm">
                                  {
                                    countSet(reply.shares.length, true, 2)
                                      .value
                                  }
                                </p>
                              </div>
                            </Tooltip> */}
                            {/* <Tooltip
                              title={`${reply.saved ? "Unsave" : "Save"}`}
                              placement="center"
                              position="bottom"
                              transition="fade"
                              transitionDuration={200}
                              classNames={{
                                body: "tooltip_comp mt-1 bg-gray-500 dark:bg-darkModeBg dark:text-white text-[0.65rem] ml-1",
                              }}
                              color="gray"
                            >
                              <div
                                className="post_action post_user_save_action relative select-none flex text-gray-500 dark:text-darkText items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary dark:hover:text-primary"
                                onClick={() => {
                                  if (isBrowser()) {
                                    alert("saved post2");
                                  }
                                }}
                              >
                                {reply.saved ? (
                                  <SaveIconSolid
                                    className={"text-primary"}
                                    width={16}
                                  />
                                ) : (
                                  <SaveIcon width={16} />
                                )}
                              </div>
                            </Tooltip> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {replySent && (
        <div className="relative">
          <LineLoader width="100%" position="absolute" />
        </div>
      )}
      {popupCard && (
        <Transition
          transition={"pop"}
          className={
            "media_error_upload fixed bottom-6 mb-6 right-0 left-0 z-[400] aniamte-pop max-w-[24rem] mr-auto ml-auto text-center"
          }
        >
          <div className="bg-primary p-[0.6rem] w-auto inline-block transition transition-scale rounded text-white">
            {popupMsg}
          </div>
        </Transition>
      )}
    </div>
  );
};

export default SpaceView;
