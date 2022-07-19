import {
  USER_LOGIN,
  SET_DATA_ACCOUNT,
  GET_USER,
} from "../../utils/config";
import { checkResponce } from "../../utils/checkResponce";
import { saveTokens } from "../../utils/saveTokens";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_ON";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_OUT = "LOGIN_OUT";
export const LOGIN_WITH_TOKEN = "LOGIN_WITH_TOKEN";

export const loginWithToken = (token) => {
  return function(dispatch) {
    fetch(GET_USER, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(checkResponce)
      .then(({ success, user }) => {
        if (success) {
          dispatch(userLoginOn(user));
        }
      });
  }
}

const userLoginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
}

export const userLoginOn = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}

export const userLoginOut = () => {
  return {
    type: LOGIN_OUT
  }
}

const userLoginFailed = () => {
  return {
    type: LOGIN_FAILED
  }
}

export function userLogin(form) {
  const dataSize = Object.keys(form).length;
  let URL;
  if(dataSize === 2) URL = USER_LOGIN;
  if(dataSize === 3) URL = SET_DATA_ACCOUNT;
  return function(dispatch) {
    dispatch(userLoginRequest());
     fetch(URL, {
       method: "POST",
       headers: {
         "Content-Type": "Application/json",
       },
       body: JSON.stringify(form),
     })
       .then(checkResponce)
       .then(({ success, accessToken, refreshToken, user }) => {
         if (success) {
           dispatch(userLoginOn(user));
           saveTokens(refreshToken, accessToken);
         }
       })
       .catch((err) => {
         console.log(`Войти не удалось ${err}`);
         dispatch(userLoginFailed());
       });
  }
}