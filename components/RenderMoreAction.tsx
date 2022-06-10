import { useEffect, useState } from "react";
import { createCollectionRef, createDocRef, OnSnapshot } from "../config/auth/firebase";
import { Reply, Space, User } from "../interface/User";
import { isFollowing } from "../utils";
import Icon from "./Icon";

const RenderMoreAction = ({
  user,
  users,
  space,
  renderType,
}: {
  user: User;
  users: User[];
  space: Space | Reply;
  renderType: "space" | "reply";
}) => {
  const [usersDB, setUsersDB] = useState<User[]>([]);
  const [loaded , setLoaded] = useState(false);
  const [userDB, setUserDB] = useState<User>({} as User);
  useEffect(() => {
    const ref = createCollectionRef("users");
    OnSnapshot(ref, (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => doc.data() as User);
      setUsersDB(fetchedUsers);
    });
  }, []);
  useEffect(() => {
    const ref = createDocRef("users", user.uid);
    OnSnapshot(ref, (snapshot) => {
      const fetchedUsers = snapshot.data() as User;
      setUserDB(fetchedUsers);
    });
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
      {loaded && usersDB.filter((u) => u.uid === space.userId)[0]  !== undefined && (
    
        <div className="w-[18rem] max-w-[20rem] bg-white dark:bg-darkMode rounded shadow-sm border border-gray-100 border-opacity-80 dark:border-borderDarkMode animation_moreaction_height">
          <div className="fixed top-0 left-0 cursor-default z-[-1] w-full h-screen" 
            onClick={(e) => {
            }}
          ></div>
          <ul>
            {usersDB.filter((u) => u.uid === space.userId)[0].uid !== user.uid && (
              <>
                {isFollowing(
                  usersDB.filter((u) => u.uid === space.userId)[0].followers,
                  userDB
                ) ? (
                  <li className="p-4 hover:bg-gray-100 hover:bg-opacity-50 dark:hover:bg-darkModeBg/20 cursor-pointer"
                  onClick={(e) => {
                    console.log("unfollow");
                  }}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon
                        type="unfollow"
                        width="24"
                        height="24"
                        styles="text-gray-400"
                      />
                      <p className="text-gray-700 dark:text-white ">
                      Unfollow 
                      </p>
                      <p className="whitespace-nowrap max-w-[10rem] text-ellipsis overflow-hidden dark:text-white ">@{usersDB.filter((u) => u.uid === space.userId)[0].userName}</p>
                    </div>
                  </li>
                ) : (
                  <li className="p-4 hover:bg-gray-100 hover:bg-opacity-50 dark:hover:bg-darkModeBg/20 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Icon
                        type="follow"
                        width="24"
                        height="24"
                        styles="text-gray-500"
                      />
                      <p className="text-gray-700 dark:text-white ">
                        Follow 
                      </p>
                      <p className="whitespace-nowrap max-w-[10rem] text-ellipsis overflow-hidden dark:text-white ">@{usersDB.filter((u) => u.uid === space.userId)[0].userName}</p>
                    </div>
                  </li>
                )}
              </>
            )}

            {renderType === "space" && (
              <>
                {usersDB.filter((u) => u.uid === space.userId)[0].uid ===
                  userDB.uid && (
                  <li className="p-4 hover:bg-gray-100 hover:bg-opacity-50 dark:hover:bg-darkModeBg/20 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Icon
                        type="edit"
                        width="24"
                        height="24"
                        styles="text-gray-500"
                      />
                      <span className="text-gray-700 dark:text-white">Edit</span>
                    </div>
                  </li>
                )}
              </>
            )}
            {usersDB.filter((u) => u.uid === space.userId)[0].uid === userDB.uid && (
              <li className="p-4 hover:bg-gray-100 hover:bg-opacity-50 dark:hover:bg-darkModeBg/20 cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Icon
                    type="delete"
                    width="24"
                    height="24"
                    styles="text-red-500 dark:text-red-500"
                  />
                  <span className="text-red-700 dark:text-red-500">Delete</span>
                </div>
              </li>
            )}
            {usersDB.filter((u) => u.uid === space.userId)[0].uid !== userDB.uid && (
              <>
                <li className="p-4 hover:bg-gray-100 hover:bg-opacity-50 dark:hover:bg-darkModeBg/20 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Icon
                      type="block"
                      width="24"
                      height="24"
                      styles="text-gray-500"
                    />
                    <span className="text-gray-700 dark:text-white">Block</span>
                  </div>
                </li>
              </>
            )}
            {usersDB.filter((u) => u.uid === space.userId)[0].uid !== userDB.uid && (
              <>
                <li className="p-4 hover:bg-gray-100 hover:bg-opacity-50 dark:hover:bg-darkModeBg/20 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Icon
                      type="report"
                      width="24"
                      height="24"
                      styles="text-gray-500"
                    />
                    <span className="text-gray-700 dark:text-white">Report</span>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
};
export default RenderMoreAction;
