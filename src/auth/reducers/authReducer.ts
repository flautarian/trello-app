import { Reducer } from "react";
import { AuthAction } from "../action/AuthActions";

export interface AuthState {
  isLoggedIn: boolean;
  authToken?: string;
  email?: string;
};

export const defaultAuthState: AuthState = {
  isLoggedIn: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  // user successfully authenticated or Refresh token
  if (action.type === "LOG_IN" || action.type === "REFRESH_TOKEN") {
    localStorage.setItem("user", JSON.stringify(action.payload));
    return {
      ...state,
      isLoggedIn: true,
      authToken: action.payload.authToken,
      email: action.payload.email,
    };
  }

  // log out user
  if (action.type === "LOG_OUT") {
    localStorage.removeItem("user");
    return defaultAuthState;
  }

  return defaultAuthState;
};

export default authReducer;