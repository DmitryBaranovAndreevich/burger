import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_OUT,
  LOGIN_OUT_REQUEST,
  LOGIN_OUT_FAILED,
  TLoginActions,
} from "../actions/login";

type TLoginState = {
  user: {
    email?: string;
    name?: string;
  };
  isLoadingRequest: boolean;
  isLoadingOn: boolean;
  isLoginOutRequest: boolean;
  isLoginOutFailed: boolean;
};

const initialData: TLoginState = {
  user: {},
  isLoadingRequest: false,
  isLoadingOn: false,
  isLoginOutRequest: false,
  isLoginOutFailed: false,
};

export const userLoadingReducer = (
  state = initialData,
  action: TLoginActions
): TLoginState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoadingRequest: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoadingOn: true,
        isLoadingRequest: false,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        isLoadingOn: false,
        isLoadingRequest: false,
      };

    case LOGIN_OUT_REQUEST:
      return {
        ...state,
        isLoginOutRequest: true,
      };

    case LOGIN_OUT:
      return {
        ...state,
        user: {},
        isLoadingRequest: false,
        isLoadingOn: false,
        isLoginOutRequest: false,
      };

    case LOGIN_OUT_FAILED:
      return {
        ...state,
        isLoginOutFailed: true,
      };

    default:
      return state;
  }
};
