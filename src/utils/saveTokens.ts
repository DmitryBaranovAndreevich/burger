import { setCookie } from "./setCookie";

export function saveTokens(refreshToken : string, accessToken: string) {
  localStorage.setItem("refreshToken", refreshToken);
  const authToken = accessToken.split("Bearer ")[1];
  setCookie("token", authToken, { expires: 1200 });
}
