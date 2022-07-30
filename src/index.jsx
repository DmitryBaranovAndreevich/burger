import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/app/app.jsx";
import { rootReducer } from "./services/reducers/index";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./services/middleware/socetMiddleware";
import {
  wsActions,
  wsGetUserOrderList,
  wsGetOrdersList,
  WS_CONNECTION_START,
  WS_USER_CONNECTION_START,
} from "./services/actions/wsActions";
import { GET_ORDERS_LIST, GET_USER_ORDERS_LIST } from "./utils/config";
import { getCookie } from "./utils/getCookie";

const token = getCookie("token");

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        socketMiddleware(
          GET_ORDERS_LIST,
          WS_CONNECTION_START,
          wsActions,
          wsGetOrdersList
        )
      )
      .concat(
        socketMiddleware(
          `${GET_USER_ORDERS_LIST}?token=${token}`,
          WS_USER_CONNECTION_START,
          wsActions,
          wsGetUserOrderList
        )
      ),
});
const root = createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
