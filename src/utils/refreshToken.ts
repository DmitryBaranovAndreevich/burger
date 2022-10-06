import { REFRESH_TOKEN } from "./config";
import { saveTokens } from "./saveTokens";
import { checkResponce } from "./checkResponce";

export const refreshToken = (refreshToken: string) => {
  return fetch(REFRESH_TOKEN, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  })
    .then(checkResponce)
    .then(({ success, accessToken, refreshToken }) => {
      if (success) {
        saveTokens(refreshToken, accessToken);
        return accessToken;
      }
    })
    .catch((err) => {
      console.log(`Проблемы с заменой токенов ${err}`);
    });
};
