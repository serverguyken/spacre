import { useRouter } from "next/router";
import useUserContext from "../../provider/userProvider"
import { isBrowser, OnLoad } from "../../utils";
import { AuthUser, User } from "../../interface/User";
import { Spinner, LineLoader } from "../../utils/loader";
import { generateLoadingTime } from "../../utils";
import { useState, useEffect } from "react";
import Icon from "../../components/Icon";

export const WithAuth = (user: AuthUser, reload: boolean, onLoad: boolean, action: {
    onAuthSuccess: (user: AuthUser) => void,
    onAuthFail: (error: string) => void
}, shouldRedirect?: boolean) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    if (isBrowser()) {
        OnLoad(() => {
            if (onLoad) {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                }, generateLoadingTime(1000, 3000));
            }
        });
    }
    const renderOnAuthSuccess = () => {
        return action.onAuthSuccess(user);
    }
    const renderOnAuthFail = () => {
        if (shouldRedirect || shouldRedirect === undefined) {
            router.push("/auth/login");
        }
        return action.onAuthFail("User is not authenticated");
    }
    const setAuthRender: any = () => {
        // check if user is not null then we know the auth instance is ready and we call check if the user is authenticated or not
        if (user.isAuthenticated !== null && user.isAuthenticated === true) {
            return renderOnAuthSuccess();
        }
        if (user.isAuthenticated !== null && user.isAuthenticated === false) {
            return renderOnAuthFail();
        }
    }
    return (
        <div>
            {loading ?
                <div className="flex justify-center items-center h-screen">
                    <div>
                        <div className="reveal_blink">
                            <Icon type='logo' color={'bg-primary'} width='80' height="90" />
                        </div>
                    </div>
                </div> :
                <div>
                    {setAuthRender()}
                </div>
            }
        </div>
    )
}

