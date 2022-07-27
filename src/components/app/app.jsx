import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../protectedRoute";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader.jsx";
import {
  LoginPage,
  RegisterPage,
  PassworRecovery,
  ChangePassword,
  ModalSwitch,
  OrdersList
} from "../../pages";
import { getItems } from "../../services/actions/burgerIngredients";
import { loginWithToken } from "../../services/actions/login";
import { getCookie } from "../../utils/getCookie";
import { refreshToken } from "../../utils/refreshToken";
import { AccountUser } from "../../pages/accountUser";
import {ModalOrdersList} from "../../pages/modalOrdersList";

function App() {
  const dispatch = useDispatch();
  const [token, setToken] = useState(getCookie("token"));
  const { isLoadingOn, user } = useSelector((store) => store.user);

  useEffect(() => {
    const tokenToRefresh = localStorage.getItem("refreshToken");
    if (!token && tokenToRefresh) {
      refreshToken(tokenToRefresh).then(() => setToken(getCookie("token")));
    }
    if (!isLoadingOn && token && tokenToRefresh) {
      dispatch(loginWithToken(token));
    }
  }, [token]);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <div className={`${appStyles.body} pt-10 pr-10 pl-10`}>
      <Router>
        <AppHeader />
        <ModalSwitch />
        <ModalOrdersList/>
        <Switch>
          <ProtectedRoute path="/profile">
            <AccountUser />
          </ProtectedRoute>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <PassworRecovery />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ChangePassword />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
