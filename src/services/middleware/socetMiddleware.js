import { getCookie } from "../../utils/getCookie";
import { refreshToken } from "../../utils/refreshToken";
export const socketMiddleware = (
  wsUrl,
  wsInitActions,
  wsActions,
  wsActionsGetData
) => {
  return (store) => {
    let socket;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { onOpen, onClose, onError } = wsActions;

      if (type === wsInitActions.type) {
        const getUrl = async () => {
          try {
            let url = wsUrl;
            if (wsInitActions.token) {
              const token = getCookie("token");

              if (!token) {
                const authToken = await refreshToken(
                  localStorage.getItem("refreshToken")
                );
                url = `${wsUrl}?token=${authToken.split("Bearer ")[1]}`;
              } else {
                url = `${wsUrl}?token=${token}`;
              }
            }
            return url;
          } catch (err) {
            console.log(err);
          }
        };
        (async () => {
          try {
            const url = await getUrl();
            socket = new WebSocket(url);

            if (socket) {
              socket.onopen = () => {
                dispatch({ type: onOpen });
              };

              socket.onerror = () => {
                dispatch({ type: onError });
              };

              socket.onmessage = (event) => {
                const { data } = event;
                const parsedData = JSON.parse(data);
                const { success, ...restParsedData } = parsedData;
                dispatch(wsActionsGetData(restParsedData));
              };

              socket.onclose = () => {
                dispatch({ type: onClose });
              };
            }
          } catch (err) {
            console.log(err);
          }
        })();
      }

      if (action.type === onClose && socket) {
        socket.close(1000);
      }
      next(action);
    };
  };
};
