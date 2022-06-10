import TextCard from "./TextCard";
import { Constructor, Poll, Space, User } from "../interface/User";
import {
  setClass,
  isBrowser,
  print,
  TimeOut,
  addClass,
  removeClass,
  generateLoadingTime,
  OnLoad,
  countSet,
  formatDate,
  stopPropagation,
  isLiked,
  isFollowing,
  isSaved,
} from "../utils/";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import useUserContext from "../provider/userProvider";
import ProfileImage from "./ProfileImage";
import Link from "next/link";
import Icon from "./Icon";
import {
  HeartIcon,
  AnnotationIcon,
  UploadIcon,
  BookmarkIcon as SaveIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconSolid,
  AnnotationIcon as AnnotationIconSolid,
  UploadIcon as UploadIconSolid,
  BookmarkIcon as SaveIconSolid,
} from "@heroicons/react/solid";
import Video from "./Video";
import PullToRefresh from "react-simple-pull-to-refresh";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/outline";
import MainLoader from "./MainLoader";
import ProfileCardHover from "./ProfileCardHover";
import Skeleton from "./Skeleton";
import API from "../config/api";
import store from "../store";
import Tooltip from "./Tooltip";
import PollCard from "./PollCard";
import MetaCard from "./MetaCard";
import { ToJSX } from "../utils/render";
import {
  createCollectionRef,
  GetDocs,
  OnSnapshot,
  Query,
} from "../config/auth/firebase";
import { Spinner } from "../utils/loader";
import RenderMoreAction from "./RenderMoreAction";
import SpaceImageModal from "./SpaceImageModal";

const FeedProfile = () => {
  const { user, signOutUser, getUsers, updateSpace, updateUser } = useUserContext();
  const router = useRouter();
  const [rendered, setRendered] = useState(false);
  const [refreshed, setRefreshed] = useState(true);
  const [fecthed, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState<any>();
  const [users, setUsers] = useState<User[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [fetchError, setFetchError] = useState(false);


    useEffect(() => {
        if (users.length === 0 || spaces.length === 0) {
            setTimeout(() => {
                setFetchError(true);
            }, 1000);
        }
    }, [users, spaces]);
  //console.log(user, spaces);
  // signOutUser({
  //     onSuccess: () => {},
  //     onError: (err: any) => {}
  // })

  useEffect(() => {
    const ref = createCollectionRef("users");
    OnSnapshot(ref, (snapshot) => {
      if (snapshot) {
        const fetchedUsers = snapshot.docs.map((doc) => doc.data() as User);
        setUsers(fetchedUsers);
      }
    });
  }, []);
  

  const likeHandler = (id: string) => {
    const like_count = document.getElementById(`${id}_like_count`);
    const likeSpace = spaces.filter((s) => s.spaceId === id)[0];
    if (isLiked(likeSpace.likes, user)) {
      // remove like
      const newSpace = {
        ...likeSpace,
        likes: likeSpace.likes.filter((l: Constructor) => l.userId !== user.uid),
      };
      updateSpace(likeSpace.spaceId, newSpace, {
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
        ...likeSpace,
        likes: [...likeSpace.likes, { userId: user.uid }],
      };
      updateSpace(likeSpace.spaceId, newSpace, {
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

  const saveHandler = (space: Space) => {
    // current user is saving this space, we need to add the spaceId to the user's saved spaces and we need to update the user's saved spaces
    // check if the user is already saved this space


    if (isSaved(space.spaceId, user)) {
      // remove saved space
      const newUser = {
        ...user,
        saves: user.saves.filter((s) => s.spaceId !== space.spaceId),
      };
      updateUser(user.uid, newUser, {
        onSuccess: () => {
        },
        onError: (err: any) => { },
      });
    } else {
      // add saved space
      const newUser = {
        ...user,
        saves: [...user.saves, { spaceId: space.spaceId }],
      };
      updateUser(user.uid, newUser, {
        onSuccess: () => {
        },
        onError: (err: any) => { },
      });
    }
  }


  const replyHandler = (userName: string, spaceId: string) => {
    router.push(`/${userName}/space/${spaceId}`);
  }



  const onFollow = (spaceUser: User) => {
    const forUser = {
      ...spaceUser,
      followers: [...spaceUser.followers, { userId: user.uid }],
      followersCount: spaceUser.followersCount + 1,
    };
    const forCurrentUser = {
      ...user,
      following: [...user.following, { userId: spaceUser.uid }],
      followingsCount: user.followingsCount + 1,
    };
    // if current user is following the space user
    if (isFollowing(user.following, spaceUser)) {
      return;
    } else {
      updateUser(spaceUser.uid, forUser, {
        onSuccess: () => {
          updateUser(user.uid, forCurrentUser, {
            onSuccess: () => {
            },
            onError: (err: any) => {
            },
          });
        },
        onError: (err: any) => {
        },
      });
    }
  };
  const onUnFollow = (spaceUser: User) => {
    const forUser = {
      ...spaceUser,
      followers: spaceUser.followers.filter((f: Constructor) => f.userId !== user.uid),
      followersCount: spaceUser.followersCount - 1,
    };
    const forCurrentUser = {
      ...user,
      following: user.following.filter((f: Constructor) => f.userId !== spaceUser.uid),
      followingsCount: user.followingsCount - 1,
    };
    if (isFollowing(user.following, spaceUser)) {
      updateUser(spaceUser.uid, forUser, {
        onSuccess: () => {
          updateUser(user.uid, forCurrentUser, {
            onSuccess: () => {
            },
            onError: (err: any) => {
            },
          });
        },
        onError: (err: any) => {
        },
      });
    }
  };

  const fetchSpaces = (ref: any) => {
    if (isEmpty) {
    } else {
      const query = Query(
        ref,
        { field: "createdAt", order: "desc" },
        10,
        lastDoc
      );
      OnSnapshot(query, (snapshot) => {
        if (snapshot.size === 0) {
          setLoading(false);
          setFetched(false);
          setIsEmpty(true);
        } else {
          const changeType = snapshot.docChanges();
          if (changeType.length > 0) {
            if (changeType[0].type === "modified") {
              setLoading(false);
            } else {
              setLoading(true);
            }
          }
          setTimeout(() => {
            const newSpaces = snapshot.docs.map((docs: any) => docs.data());
            setSpaces([...spaces, ...newSpaces]);
            const lastDoc = snapshot.docs[snapshot.docs.length - 1];
            setLastDoc(lastDoc);
            setLoading(false);
            setFetched(false);
            setIsEmpty(false);
          }, 1000);
        }
      });
    }
  };

  useEffect(() => {
    const ref = createCollectionRef("spaces");
    fetchSpaces(ref);
  }, []);

  useEffect(() => {
    if (fecthed) {
      setFetched(false);
      const ref = createCollectionRef("spaces");
      fetchSpaces(ref);
    }
  }, [fecthed]);

  useEffect(() => {
    if (isBrowser()) {
      if (isEmpty) return;
      // check if ending of window scroll
      window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          setFetched(true);
        }
      });
    }
  }, [isEmpty]);

  if (isBrowser()) {
    TimeOut(() => {
      setRendered(true);
    }, generateLoadingTime(1000, 3000));
  }
  const handleRefresh = async () => {
    setRefreshed(false);
    TimeOut(() => {
      setRefreshed(true);
    }, 1000);
  };

  const viewUserPost = (username: string) => {
    router.push(`/${username}`);
  };
  
  return (
    <>
      {
        users.length > 0 && spaces.length > 0 ?
          <div
            className="feedprofile_container relative mt-2 "
            id="feed_main_container"
          >
            <div>
              <TextCard />
            </div>
            {!rendered ? (
              <div className="screen-sm:pt-24">
                <div className="opacity-0">
                  <Skeleton type="feed" />
                </div>
                {/* <div className="flex absolute top-60 left-1/2  justify-center">
            <MainLoader />
          </div> */}
              </div>
            ) : (
              // <PullToRefresh
              //   isPullable={true}
              //   onRefresh={handleRefresh}
              //   pullingContent={
              //     <div className="pullDownContentHeader pt-8 screen-sm:pt-20 screen-xssm:pt-32 flex justify-center">
              //       <div className="pullDownContentHeaderText">
              //         <ArrowDownIcon width={20} className="text-gray-500" />
              //       </div>
              //     </div>
              //   }
              //   refreshingContent={
              //     <div className="refreshingConentHeader pt-8 screen-sm:pt-20 screen-xssm:pt-32 flex justify-center">
              //       <div className="refreshingConentHeaderText">
              //         <MainLoader />
              //       </div>
              //     </div>
              //   }
              // >
              <div className="screen-sm:pt-16 pb-5" id="spaces_feed">
                {refreshed ? (
                  spaces.map((space: Space, index: number) => {
                    return (
                      <div
                        key={space.spaceId}
                        id={`${space.spaceId}_profile_feed_view`}
                        className="bg-white dark:bg-darkMode hover:bg-gray-50 dark:hover:bg-darkModeBg/20 cursor-pointer whitespace-pre-wrap feed_post_contents_card pt-3 h-auto p-3  border-b border-gray-100  dark:border-borderDarkMode"
                        onClick={() => {
                          replyHandler(space.userName, space.spaceId);
                        }}
                      >
                        <div></div>
                        <div className="flex justify-between">
                          <div className="flex space-x-2 w-full">
                            <div className="profile_image mt-1" 
                              onClick={(e: any) => {
                                stopPropagation(e);
                              }}
                            >
                              <Link href={`/${space.userName}`}>
                                <a>
                                  <ProfileImage
                                    user={
                                      users.filter((u) => u.uid === space.userId)[0]
                                    }
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className="profile_name_post_feed w-full -mt-1 pl-[6px] pr-[6px]">
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
                                              profile_hover_card.classList.add(
                                                "top-6"
                                              );
                                            } else {
                                              profile_hover_card.classList.remove(
                                                "top-6"
                                              );
                                              profile_hover_card.classList.add(
                                                "bottom-6"
                                              );
                                            }
                                          }}
                                          onClick={(e: any) => {
                                            stopPropagation(e);
                                          }}
                                        >
                                          <Link
                                            href={`/${users.filter(
                                              (u) => u.uid === space.userId
                                            )[0].userName
                                              }`}
                                          >
                                            <a className="font-semibold feed_user_profile_name">
                                              {
                                                users.filter(
                                                  (u) => u.uid === space.userId
                                                )[0].displayName
                                              }
                                            </a>
                                          </Link>
                                        </div>
                                        {users.filter(
                                          (u) => u.uid === space.userId
                                        )[0].verified && (
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
                                          currentUser={user}
                                          users={users}
                                          user={users.filter((u) => u.uid === space.userId)[0]}
                                          space={space}
                                          renderType="space"
                                          onFollow={onFollow}
                                          onUnFollow={onUnFollow}
                                        />
                                      </div>
                                    </div>
                                    <div className="profile_username_post_timestamp flex items-center">
                                      <div className="profile_username whitespace-nowrap max-w-[16rem] text-ellipsis overflow-hidden"
                                      onClick={(e: any) => {
                                        stopPropagation(e);
                                      }}
                                      >
                                        <Link
                                          href={`/${users.filter(
                                            (u) => u.uid === space.userId
                                          )[0].userName
                                            }`}
                                        >
                                          <a className="text-sm text-dimGray dark:text-darkText">
                                            @
                                            {
                                              users.filter(
                                                (u) => u.uid === space.userId
                                              )[0].userName
                                            }
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
                                      const post_more_actions =
                                        document.getElementById(
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
                                    <div className="text-gray-500 hover:bg-primary  dark:bg-opacity-40  dark:text-opacity- hover:bg-opacity-10 hover:text-primary rounded-full w-8 h-8 flex justify-center items-center">
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
                                      className="post_more_actions absolute -top-10 h-[200px] right-0 mt-10 hidden select-none z-40"
                                      id={`${space.spaceId}_post_more_actions`}
                                    >
                                      <RenderMoreAction
                                        user={user}
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
                                  <div className="post_text">
                                  <ToJSX text={space.text} />
                                  </div>
                                  {space.images && (
                                    <>
                                    {
                                      space.images.map((url: string, index: number) => {
                                        return (
                                          <div className="mt-4 max-w-[400px] cursor-pointer"
                                            key={index}
                                            id={`${space.spaceId}_post_image_${index}`}
                                            onClick={(e: any) => {
                                              stopPropagation(e);
                                              // render the modal for the image
                                              const modal = document.getElementById(`${space.spaceId}_post_image_${index}_modal`) as HTMLDivElement;
                                              modal.classList.toggle("hidden");
                                              const other_modal = document.querySelectorAll(".post_image_modal") as NodeListOf<HTMLDivElement>;
                                              for (let i = 0; i < other_modal.length; i++) {
                                                if (other_modal[i].id !== `${space.spaceId}_post_image_${index}_modal`) {
                                                  other_modal[i].classList.add("hidden");
                                                }
                                              }
                                            }}
                                          >
                                            <img
                                              key={space.spaceId}
                                              src={url}
                                              alt="A post image"
                                              className="rounded-lg w-full max-h-[300px] object-cover object-center"
                                            />
                                            
                                            <div className="hidden"
                                              id={`${space.spaceId}_post_image_${index}_modal`}
                                            >
                                                <SpaceImageModal space={space} image={url} renderType="space" />
                                            </div>
                                          </div>
                                        );
                                      })
                                    }
                                    </>
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
                                      title={`${isLiked(space.likes, user) ? "Unlike" : "Like"}`}
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
                                          isLiked(space.likes, user)
                                            ? "text-salmon dark:text-salmon"
                                            : "text-gray-500  dark:text-darkText"
                                        )}
                                        onClick={(e: any) => {
                                          stopPropagation(e);
                                          likeHandler(space.spaceId);
                                        }}
                                      >
                                        {isLiked(space.likes, user) ? (
                                          <HeartIconSolid
                                            className={"text-salmon"}
                                            width={16}
                                          />
                                        ) : (
                                          <HeartIcon width={16} />
                                        )}
                                        <p className="text-sm"
                                          id={`${space.spaceId}_like_count`}
                                        >
                                          {
                                            countSet(space.likes.length, true, 2)
                                              .value
                                          }
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
                                      <div className="post_action post_user_comment_action relative select-none flex text-gray-500 dark:text-darkText items-center space-x-2 cursor-pointer p-1 rounded-sm hover:bg-green-600 hover:bg-opacity-10 hover:text-green-600 dark:hover:text-green-600"
                                        onClick={(e: any) => {
                                          stopPropagation(e);
                                          replyHandler(space.userName, space.spaceId);
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
                                            countSet(space.shares.length, true, 2)
                                              .value
                                          }
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
                                        {isSaved(space.spaceId, user) ? (
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
                    );
                  })
                ) : (
                  <Skeleton type="feed" />
                )}
                {loading && !isEmpty && (
                  <div className="mt-8 mb-8">
                    <Spinner width={24} color="var(--color-primary)" />
                  </div>
                )}
                {isEmpty && !loading && (
                  <div className="mt-8 mb-8 text-center">
                    <span>You&apos;ve reached the end of the feed</span>
                  </div>
                )}
              </div>
              // </PullToRefresh>
            )}
          </div>
          :
          <>
          <div className="flex flex-col items-center justify-center relative">
              <div className="text-center mt-10 mb-10">
                  {
                      fetchError ? (
                          <div className="mt-6 text-center">
                              <span>
                                  <span>Can&apos;t fetch spaces</span>
                              </span>
                          </div>
                      ) : (

                          <div className="flex absolute top-60 left-1/2  justify-center">
                              <MainLoader />
                          </div>
                      )
                  }
              </div>
          </div>
      </>
      }

    </>
  );
};

export default FeedProfile;
