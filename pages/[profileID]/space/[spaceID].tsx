import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BackButtton from "../../../components/BackButton";
import Icon from "../../../components/Icon";
import Layout from "../../../components/Layout";
import SpaceView from "../../../components/SpaceView";
import Widget from "../../../components/Widget";
import {
  createCollectionRef,
  createDocRef,
  GetDocs,
  OnSnapshot,
  Query,
} from "../../../config/auth/firebase";
import { WithAuth } from "../../../config/auth/route";
import { AuthUser, Space, User } from "../../../interface/User";
import useUserContext from "../../../provider/userProvider";
import { isBrowser } from "../../../utils";

function Space() {
  const router = useRouter();
  const { profileID, spaceID } = router.query as any;
  const [title, setTitle] = useState("");
  const { authUser, signOutUser } = useUserContext();
  const [spaceRef, setSpaceRef] = useState(null as any);
  const [space, setSpace] = useState<Space | any>({});
  const [spaceUser, setSpaceUser] = useState<User | any>({});
  const [users, setUsers] = useState<User[]>([]);
  const { getUser, getUsers, getSpaces } = useUserContext();
  useEffect(() => {
    if (spaceID && spaceID !== "") {
      const ref = createDocRef("spaces", spaceID);
      OnSnapshot(ref, (data: any) => {
        if (data) {
          setSpace(data.data());
          setSpaceRef(spaceRef);
        }
      });
    }
  }, [spaceID]);
  useEffect(() => {
    if (space) {
      getUser(space.userId, {
        onSuccess: (data: User) => {
          setSpaceUser(data);
        },
        onError: (error: any) => {},
      });
    }
  }, [space]);
  useEffect(() => {
    if (spaceUser) {
      getUsers(spaceUser.uid, {
        onSuccess: (data: User[]) => {
          setUsers(data);
        },
        onError: (error: any) => {},
      });
    }
  }, [spaceUser]);

 

  const handleSignOut = () => {
    signOutUser({
      onSuccess: () => {
        if (isBrowser()) {
          router.push("/auth/login");
        }
      },
      onError: (error) => {
        return null;
      },
    });
  };

  return WithAuth(authUser, false, true, {
    onAuthSuccess: (user: AuthUser) => {
      return (
        <div>
          {Object.keys(space).length === 0 &&
          Object.keys(spaceUser).length === 0 &&
          Object.keys(users).length === 0 ? (
            <div>
              <Head>
                <title>Page not found</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <Layout
                path="home"
                content_one={
                  <div className="flex justify-center mt-32 mb-32">
                    <h1>Page not found</h1>
                  </div>
                }
              />
            </div>
          ) : (
            <div>
              <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <Layout
                path="home"
                content_one={
                  <div className="h-full">
                    <div className="header-title-back pt-3 p-2 sticky top-0 mt-1 z-30 w-full bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(26,26,26,0.7)] backdrop-blur-[12px]">
                      <div className="flex items-center space-x-3">
                        <BackButtton onClick={() => {
                            router.push("/" + profileID);
                        }} />
                        <span className="text-[1.3rem] text-gray-700 font-bold dark:text-gray-100">
                          Space
                        </span>
                      </div>
                    </div>
                    <div className="feed_contents_2">
                      <SpaceView
                        user={spaceUser}
                        spaceID={spaceID}
                        users={users}
                      />
                    </div>
                  </div>
                }
                content_two={<Widget />}
              />
            </div>
          )}
        </div>
      );
    },
    onAuthFail: (error: any) => {
      return <></>;
    },
  });
}

export default Space;
