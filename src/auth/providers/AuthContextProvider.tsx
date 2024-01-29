// Global imports
import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

// Project dependencies
import { AuthActionEnum } from "../action/AuthActions";

// Reducer
import authReducer, { AuthState, defaultAuthState } from "../reducers/AuthReducer";

type AuthProviderProps = {
  children: React.ReactElement;
};

export type UserData = {
  authToken: string;
  email: string;
};

export interface AuthContext {
  authState: AuthState;
  globalLogInDispatch: (props: UserData) => void;
  globalLogOutDispatch: () => void;
  globalRefreshDispatch: (props: UserData) => void;
  navigateTo: (path: string) => void;
};

// Auth context
const authCtx = createContext<AuthContext>({
  authState: defaultAuthState,
  globalLogInDispatch: () => { },
  globalLogOutDispatch: () => { },
  globalRefreshDispatch: () => { },
  navigateTo: () => {},
});

export const AuthContextProvider = (props: AuthProviderProps) => {

  const { children } = props;
  const [authState, authDispatch] = useReducer(authReducer, defaultAuthState);
  const navigate = useNavigate();

  // Check if user detail is persisted, mostly catering for refreshing of the browser
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData: UserData = JSON.parse(user);
      authDispatch({ type: AuthActionEnum.LOG_IN, payload: userData });
    }
  }, []);

  const globalLogInDispatch = useCallback((props: UserData) => {
    const { authToken, email } = props;
    authDispatch({
      type: AuthActionEnum.LOG_IN,
      payload: {
        authToken,
        email
      },
    });
    navigate("/boards");
  },
    [navigate]
  );

  const navigateTo = (path: string) => {
    navigate(path);
  }

  const globalLogOutDispatch = useCallback(() => {
    authDispatch({ type: AuthActionEnum.LOG_OUT, payload: null });
    navigate("/user/login");
  }, [navigate]);

  const globalRefreshDispatch = useCallback((props: UserData) => {
    const { authToken, email } = props;
    authDispatch({
      type: AuthActionEnum.REFRESH_TOKEN,
      payload: {
        authToken,
        email
      },
    });
  }, [navigate]);

  // context values to be passed down to children
  const ctx = {
    authState,
    globalLogInDispatch,
    globalLogOutDispatch,
    globalRefreshDispatch,
    navigateTo
  };

  return <authCtx.Provider value={ctx}>{children}</authCtx.Provider>;
};

export default authCtx;