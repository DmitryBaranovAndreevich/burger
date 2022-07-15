import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader.jsx";
import IngredientDetails from "../ingredientDetails/IngredientDetails";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
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
import Spinner from "../spinner/spinner";

function App() {
  const dispatch = useDispatch();

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
        <Route path="/" exact={true}>
          <MainPage setModal={setModal} />
        </Route>
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
        <Route path="/profile" exact={true}>
          <Profile />
        </Route>
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
