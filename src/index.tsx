import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { rootReducer } from "./services/reducers/index";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./services/middleware/socetMiddleware";
import {
  wsActions,
  wsGetUserOrderList,
  wsGetOrdersList,
  wsConnectionStart,
  wsUserConnectionStart,
} from "./services/actions/wsActions";
import { GET_ORDERS_LIST, GET_USER_ORDERS_LIST } from "./utils/config";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        socketMiddleware(
          GET_ORDERS_LIST,
          wsConnectionStart(),
          wsActions,
          wsGetOrdersList
        )
      )
      .concat(
        socketMiddleware(
          GET_USER_ORDERS_LIST,
          wsUserConnectionStart(),
          wsActions,
          wsGetUserOrderList
        )
      ),
});

const root = createRoot(document.querySelector("#root") as Element);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
