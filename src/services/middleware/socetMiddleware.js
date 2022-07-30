

export const socketMiddleware = (wsUrl,wsInitActions, wsActions,wsActionsGetData) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError } = wsActions;
      const { isLoadingOn } = getState().user;

      if (type === wsInitActions && isLoadingOn) {
        socket = new WebSocket(`${wsUrl}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen});
        };

        socket.onerror = (event) => {
          dispatch({ type: onError });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch(wsActionsGetData(restParsedData));
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose });
        }
      }
       next(action);
    };
  };
};
