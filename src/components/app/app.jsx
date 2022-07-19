import { BrowserRouter as Router, Route } from "react-router-dom";
import { ProtectedRoute } from "../protectedRoute";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader.jsx";
import IngredientDetails from "../ingredientDetails/IngredientDetails";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import Spinner from "../spinner/spinner";
import {
  MainPage,
  LoginPage,
  RegisterPage,
  PassworRecovery,
  ChangePassword,
  Profile,
} from "../../pages";
import { getItems } from "../../services/actions/burgerIngredients";
import { deleteOrder } from "../../services/actions/burgerConstructor";
import { deleteIngredientDetals } from "../../services/actions/ingredientsDetals";
import { getOrderNumberFailed } from "../../services/actions/orderDetals";
import { loginWithToken } from "../../services/actions/login";
import { getCookie } from "../../utils/getCookie";
import { refreshToken } from '../../utils/refreshToken';

function App() {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const { isLoadingOn } = useSelector((store) => store.user);
  const tokenToRefresh = localStorage.getItem("refreshToken");

  useEffect(() => {
    console.log('test')
    if(!token&&refreshToken) {
      console.log('test2')
      refreshToken(tokenToRefresh);
    }
    if (!isLoadingOn && token) {
      dispatch(loginWithToken(token));
      }
  }, [isLoadingOn,token]);

  const [isModal, setModal] = useState(false);

  const { isOpenIngredienDetals } = useSelector(
    (store) => store.ingredienDetals
  );

  const { isOpenOrderDetals, getOrderNumberRequest } = useSelector(
    (store) => store.orderNumber
  );

  const isClose = () => {
    setModal(false);
    isOpenIngredienDetals && dispatch(deleteIngredientDetals());
    if (isOpenOrderDetals) {
      dispatch(getOrderNumberFailed());
      dispatch(deleteOrder());
    }
  };

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const visible = getOrderNumberRequest ? false : true;

  return (
    <div className={`${appStyles.body} pt-10 pr-10 pl-10`}>
      <Router>
        <AppHeader />
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
        <Route path="/" exact={true}>
          <MainPage setModal={setModal} />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
      </Router>
      {isModal && (
        <Modal handelCloseModal={isClose} visible={visible}>
          {isOpenIngredienDetals && <IngredientDetails />}
          {getOrderNumberRequest ? (
            <Spinner />
          ) : (
            isOpenOrderDetals && <OrderDetails />
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
