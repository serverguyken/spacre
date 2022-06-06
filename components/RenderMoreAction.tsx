import { Space, User } from "../interface/User";
import { isFollowing } from "../utils";
import Icon from "./Icon";

const RenderMoreAction = ({
  user,
  users,
  space,
}: {
  user: User | any;
  users: User[];
  space: Space;
}) => {
  return (
    <div className="w-60 max-w-[18rem] bg-white rounded shadow-sm border border-gray-100 border-opacity-80">
      <ul>
        {users.filter((u) => u.uid === space.userId)[0].uid !== user.uid && (
          <>
            { isFollowing(users.filter((u) => u.uid === space.userId)[0].followers, user) ? (
              <li className="p-4 hover:bg-gray-100 hover:bg-opacity-50">
                <div className="flex items-center space-x-2">
                  <Icon
                    type="unfollow"
                    width="24"
                    height="24"
                    styles="text-gray-400"
                  />
                  <span className="text-gray-700">
                    Unfollow @
                    {users.filter((u) => u.uid === space.userId)[0].userName}
                  </span>
                </div>
              </li>
            ) : (
              <li className="p-4 hover:bg-gray-100 hover:bg-opacity-50">
                <div className="flex items-center space-x-2">
                  <Icon
                    type="follow"
                    width="24"
                    height="24"
                    styles="text-gray-500"
                  />
                  <span className="text-gray-700">
                    Follow @
                    {users.filter((u) => u.uid === space.userId)[0].userName}
                  </span>
                </div>
              </li>
            )}
          </>
        )}

        {users.filter((u) => u.uid === space.userId)[0].uid === user.uid && (
          <li className="p-4 hover:bg-gray-100 hover:bg-opacity-50">
            <div className="flex items-center space-x-2">
              <Icon type="edit" width="24" height="24" styles="text-gray-500" />
              <span className="text-gray-700">Edit</span>
            </div>
          </li>
        )}
        {users.filter((u) => u.uid === space.userId)[0].uid === user.uid && (
          <li className="p-4 hover:bg-gray-100 hover:bg-opacity-50">
            <div className="flex items-center space-x-2">
              <Icon type="delete" width="24" height="24" styles="text-red-500" />
              <span className="text-red-700">Delete</span>
            </div>
          </li>
        )}
        {users.filter((u) => u.uid === space.userId)[0].uid !== user.uid && (
          <>
            <li className="p-4 hover:bg-gray-100 hover:bg-opacity-50">
              <div className="flex items-center space-x-2">
                <Icon
                  type="block"
                  width="24"
                  height="24"
                  styles="text-gray-500"
                />
                <span className="text-gray-700">Block</span>
              </div>
            </li>
          </>
        )}
        {users.filter((u) => u.uid === space.userId)[0].uid !== user.uid && (
          <>
            <li className="p-4 hover:bg-gray-100 hover:bg-opacity-50">
              <div className="flex items-center space-x-2">
                <Icon
                  type="report"
                  width="24"
                  height="24"
                  styles="text-gray-500"
                />
                <span className="text-gray-700">Report</span>
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
export default RenderMoreAction;
