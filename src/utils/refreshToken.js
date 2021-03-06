import { REFRESH_TOKEN } from "./config";
import { saveTokens } from "./saveTokens";
import { checkResponce } from "./checkResponce";

export const refreshToken = (refreshToken) => {
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
      }
    })
    .catch(err => {
      console.log(`Проблемы с заменой  refreshToken ${err}`);
    })
};
