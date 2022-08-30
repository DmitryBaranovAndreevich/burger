import { getCookie } from "./getCookie";
import { saveTokens } from "./saveTokens";
import { REFRESH_TOKEN } from "./config";
import { checkResponce, IOptions } from "./checkResponce";

type TResFromServer = {
 readonly success: boolean;
 readonly accessToken: string;
 readonly refreshToken: string;
};

export async function fetchWithToken(url: string, options: IOptions) {
  const tokenToRefresh = localStorage.getItem("refreshToken");
  const token = getCookie("token");

  if (!token) {
    try {
      const res = await fetch(REFRESH_TOKEN, {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({ token: tokenToRefresh }),
      });
      const {
        success,
        accessToken,
        refreshToken: tokenRefresh,
      } = await checkResponce<TResFromServer>(res);
      if (success) {
        saveTokens(tokenRefresh, accessToken);
        if ("Authorization" in options.headers) {
          options.headers.Authorization = accessToken;
        }
      }
    } catch (err) {
      console.log(`Проблемы с заменой токенов ${err}`);
    }
  }

  return fetch(url, options);
}
