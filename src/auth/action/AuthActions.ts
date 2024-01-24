export enum AuthActionEnum {
    LOG_IN = 'LOG_IN',
    LOG_OUT = 'LOG_OUT',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
  };
  
  export type AuthAction = {
    type: AuthActionEnum.LOG_IN,
    payload: {
      authToken: string;
      email: string;
    }
  } | {
    type: AuthActionEnum.LOG_OUT,
    payload: null,
  } | {
    type: AuthActionEnum.REFRESH_TOKEN,
    payload: {
      authToken: string;
      email: string;
    }
  }