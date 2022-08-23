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
} from "../../pages";
import { getItems } from "../../services/actions/burgerIngredients";
import { loginWithToken } from "../../services/actions/login";
import { getCookie } from "../../utils/getCookie";
import { refreshToken } from "../../utils/refreshToken";
import { AccountUser } from "../../pages/accountUser";

interface IStore {
  ingredientsList : {items: null|[],itemsFailed: boolean,itemsRequest: boolean};
  burgerConstructorList: {constructorItems: [],constructorItemsFailed: boolean}
  orderNumber: {orderNumber: null|number,getOrderNumberFailed: boolean,getOrderNumberRequest: boolean};
  user : {user: object,isLoadingRequest: boolean,isLoadingOn: boolean,isLoginOutRequest: boolean,isLoginOutFailed: boolean};
  ordersList: {wsConnected: boolean,inConnected: boolean,ordersList: object,userOrdersList: [],}
}

function App() {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string|undefined>(getCookie("token"));
  const { isLoadingOn } = useSelector((store : IStore) => store.user);

  useEffect(() => {
    const tokenToRefresh = localStorage.getItem("refreshToken");
    if (!token && tokenToRefresh) {
      refreshToken(tokenToRefresh).then(() => setToken(getCookie("token")));
    }
    if (!isLoadingOn && token && tokenToRefresh) {
      dispatch(loginWithToken(token));
    }
  }, [isLoadingOn, token]);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <div className={`${appStyles.body} pt-10 pr-10 pl-10`}>
      <Router basename={process.env.PUBLIC_URL}>
        <AppHeader />
        <ModalSwitch />
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
