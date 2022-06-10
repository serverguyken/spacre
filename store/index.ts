import API from "../config/api";
import { User, Space } from "../interface/User";
import useUserContext from "../provider/userProvider";
import VALTIO, { InitialObject } from "./valtio";
import { api_url } from "../config";
import { Meta } from "../interface/Meta";
import { u_getSpaces } from "../config/auth/user";

export const getSpaces = (
  uid: string,
  limit: number,
  cbs: {
    onSuccess: (spaces: Space[]) => void;
    onError: (error: any) => void;
  }
) => {
  try {
    u_getSpaces(uid, limit)
      .then((result: any) => {
        if (result) {
          cbs.onSuccess(result.data.spaces);
        } else {
          cbs.onSuccess([]);
        }
      })
      .catch((error: any) => {
        cbs.onError("An error occured");
      });
  } catch (error: any) {
    cbs.onError("An error occured");
  }
};
export interface STORE {
  user: User;
  widget_rendered: boolean;
  signup_step: {
    step: number;
    step_name: string;
    skipable: boolean;
    completed: boolean;
  };
  postTextareaShown: boolean;
  searchList: any[];
  renderNoSearch: boolean;
  spaces: Space[];
  users: User[];
  fetchUsers: {
    users: User[];
    status: Object;
  };
  media: {
    files: any[];
    fileTypes: any[];
  };
  files: {
    length: number;
  };
  filesUrl: Array<string>;
  metaData: Meta | null;
  getUsers: (id: any) => Promise<void>;
}

const store: {
  content: InitialObject;
  set: (name: keyof STORE, value: any) => void;
  get: (name: keyof STORE) => any;
} = {
  content: VALTIO.proxy({
    data: {
      user: {
        uid: "",
        email: "",
        displayName: "",
        userName: "",
        profileImage: null,
        bannerImage: null,
        blocked: false,
        premium: false,
        verified: false,
        bio: null,
        followers: [],
        following: [],
        spaces: [],
        followersCount: 0,
        followingsCount: 0,
        spacesCount: 0,
        createdAt: "",
        updatedAt: "",
        saves: [],
      },
      widget_rendered: false,
      signup_step: {
        step: 1,
        step_name: "CREATING_NAME_EMAIL",
        skipable: false,
        completed: false,
      },
      postTextareaShown: false,
      searchList: [],
      renderNoSearch: false,
      spaces: [],
      users: [],

      fetchUsers: {
        users: [],
        status: {},
      },
      media: {
        files: [],
        fileTypes: [],
      },
      files: {
        length: 0,
      },
      filesUrl: [],
      metaData: null,
      getUsers: (id: any) => {
        return API.get(`${api_url}/get/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${id}`,
          },
        })
          .then((res) => {
            store.set("fetchUsers", {
              users: res.data.users ? res.data.users : [],
              status: res.data.status,
            });
          })
          .catch((err) => {
            if (err.response) {
              store.set("fetchUsers", {
                users: [],
                status: err.response.data,
              });
            } else {
              store.set("fetchUsers", {
                users: [],
                status: {
                  code: 500,
                  success: false,
                  message: "Something went wrong",
                },
              });
            }
          });
      },
    } as STORE,
  }),
  set: (name: keyof STORE, value: any) => {
    if (name in store.content.data) {
      store.content.data[name] = value;
    } else {
      throw new Error(
        `intented to set ${name} to ${value} but it is not available in the store`
      );
    }
  },
  get: (name: keyof STORE) => {
    if (name in store.content.data) {
      return store.content.data[name];
    } else {
      throw new Error(`content data '${name}' is not available in the store`);
    }
  },
};

export default store;
