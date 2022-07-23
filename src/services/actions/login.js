import {
  USER_LOGIN,
  SET_DATA_ACCOUNT,
  GET_USER,
  USER_LOGIN_OUT,
} from "../../utils/config";
import { checkResponce } from "../../utils/checkResponce";
import { saveTokens } from "../../utils/saveTokens";
import { eraseCookie } from "../../utils/eraseCookie";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_ON";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_OUT_REQUEST = "LOGIN_OUT_REQUEST";
export const LOGIN_OUT_FAILED = "LOGIN_OUT_FAILED";
export const LOGIN_OUT = "LOGIN_OUT";
export const LOGIN_WITH_TOKEN = "LOGIN_WITH_TOKEN";

export const userLoginOn = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

const userLoginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const userLoginOutRequest = () => {
  return {
    type: LOGIN_OUT_REQUEST,
  };
};

export const userLoginOutFailed = () => {
  return {
    type: LOGIN_OUT_FAILED,
  };
};

export const loginOut = () => {
  return {
    type: LOGIN_OUT,
  };
};

const userLoginFailed = () => {
  return {
    type: LOGIN_FAILED,
  };
};

export const changeUserData = (token, form) => {
  return function (dispatch) {
    dispatch(userLoginRequest());
    fetch(GET_USER, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(form),
    })
      .then(checkResponce)
      .then(({ success, user }) => {
        if (success) {
          dispatch(userLoginOn(user));
          localStorage.setItem("password", form.password);
        }
      })
      .catch((err) => {
        console.log(`Че-то не так ${err}`);
      });
  };
};

export const loginWithToken = (token) => {
  return function (dispatch) {
    dispatch(userLoginRequest());
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
      })
      .catch((err) => {
        console.log(`Срок действия токена истек ${err}`);
      });
  };
};

export const userLoginOut = (refreshToken) => {
  return function (dispatch) {
    dispatch(userLoginOutRequest());
    return fetch(USER_LOGIN_OUT, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    })
      .then(checkResponce)
      .then(({ success }) => {
        if (success) {
          dispatch(loginOut());
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("password");
          eraseCookie("token");
        }
      });
  };
};

export function userLogin(form) {
  const dataSize = Object.keys(form).length;
  let URL;
  if (dataSize === 2) URL = USER_LOGIN;
  if (dataSize === 3) URL = SET_DATA_ACCOUNT;
  return function (dispatch) {
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
          localStorage.setItem("password", form.password);
        }
      })
      .catch((err) => {
        console.log(`Войти не удалось ${err}`);
        dispatch(userLoginFailed());
      });
  };
}
