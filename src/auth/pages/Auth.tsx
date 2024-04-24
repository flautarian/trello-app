// Global imports
import { useEffect, useState, useContext, FormEventHandler } from "react";

// Project dependencies
import { validatePasswordLength, validateEmailFormat } from "../validations/AuthValidations";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import AuthContext from "../providers/AuthContextProvider";
import { AuthData } from "../hooks/api/apiData";
import { useLocation } from "react-router-dom";
import useApi from "../hooks/api/useApi";
import React from "react";
import { AnimationName } from "../../utils/components/globalAnimationsComponent/globalAnimationsComponent";
import LoginForm from '../components/LoginForm/LoginForm';
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { LoginState } from "../../utils/components/globalUtils/globalutils";
import { AuthContainer } from "../../utils/components/globalStyledComponent/globalStyledComponent";

const Auth = () => {

    const [authData, setAuthData] = useState<AuthData>();

    const { request, error } = useApi();

    const { globalLogInDispatch, navigateTo } = useContext(AuthContext);

    const location = useLocation();

    const currentPathArray = location.pathname.split('/');

    const [isLogin, setIsLogin] = useState(LoginState.LOG_IN);

    const [formAnimation, setFormAnimation] = useState<AnimationName>("appear");

    const { t } = useTranslation(['home']);

    // Upon successful response from the api for login user, dispatch global auth LOG_IN event
    useEffect(() => {
        if (authData && "success" in authData) {
            globalLogInDispatch({
                authToken: authData.user.auth_token,
                email: authData.user.email
            });
        }
    }, [authData, globalLogInDispatch]);

    useEffect(() => {
        localStorage.removeItem("user");
    }), [];

    const authHandler: FormEventHandler<HTMLFormElement> = async (event) => {
        setFormAnimation("disappear");
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // Validations first!
        const userEmail = data.get("email");
        const userPassword = data.get("password");
        const userName = data.get("name");
        try {
            if (!validateEmailFormat(userEmail?.toString() || "") ||
                !validatePasswordLength(userPassword?.toString() || "")) {
                throw new Error("Incorrect credential format!");
            }
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                    username: userName,
                    appcode: "trelloapp"
                }),
            };

            const endpoint = `/${isLogin === LoginState.LOG_IN ? 'login' : 'register'}`
            await request(endpoint, params, (data) => {

                if (isLogin === LoginState.LOG_IN) {
                    toast.success(t("login_success"), { duration: 1000 });
                    setAuthData(data);
                }
                else {
                    toast.success(t("register_success"), { duration: 1000 });
                    setIsLogin(LoginState.LOG_IN);
                    setFormAnimation("appear");
                }
            });
        } catch (error: any) {
            toast.error(error.message || error.error || error, { duration: 2000 });
            setFormAnimation("appear");
        }
    };

    return (
        <>
            <AuthContainer $animationorientation={isLogin === LoginState.LOG_IN ? 1 : 0}>
                {
                    isLogin === LoginState.LOG_IN
                        ? <LoginForm onSubmit={authHandler} animation={formAnimation} setIsLogin={setIsLogin} />
                        : <RegisterForm onSubmit={authHandler} animation={formAnimation} setIsLogin={setIsLogin} />
                }
            </AuthContainer>
        </>
    );
};

export default Auth;
