import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_OUT,
} from "../actions/login";

const initialData = {
  user: {},
  isLoadingRequest: false,
  isLoadingOn: false,
}

export const userLoadingReducer = (state=initialData, action) => {
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

    case LOGIN_OUT :
      return state = initialData

    default:
      return state;
  }
}

