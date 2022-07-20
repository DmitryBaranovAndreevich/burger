import { setCookie } from "./setCookie";

export function saveTokens(refreshToken, accessToken) {
  localStorage.setItem("refreshToken", refreshToken);
  const authToken = accessToken.split("Bearer ")[1];
  setCookie("token", authToken, { expires: 1200 });
}