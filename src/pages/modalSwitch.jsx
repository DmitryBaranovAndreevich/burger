import { MainPage } from "./main";
import { OrdersList } from "./ordersList";
import { IngredientDetails } from "../components/ingredientDetails/IngredientDetails";
import { OrderDetails } from "../components/orderDetails/orderDetails";
import { Modal } from "../components/modal/modal";
import { OrderContext } from "../components/orderContext/orderContext";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const ModalSwitch = () => {
  const location = useLocation();
  const modal = location.state?.modal;
  const history = useHistory();
  const { getOrderNumberRequest } = useSelector((store) => store.orderNumber);

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div>
      <Switch location={modal || location}>
        <Route path="/" exact={true}>
          <MainPage />
        </Route>
        <Route path="/ingredients/:id">
          <IngredientDetails />
        </Route>
        <Route path="/feed" exact={true}>
          <OrdersList />
        </Route>
        <Route path={`/feed/:id`} exact={true}>
          <OrderContext />
        </Route>
      </Switch>
      {modal && (
        <Switch>
          <Modal onClose={back} visible={getOrderNumberRequest}>
            <Route path="/ingredients/:id" exact={true}>
              <IngredientDetails />
            </Route>
            <Route path="/order" exact={true}>
              <OrderDetails />
            </Route>
            <Route path={`/feed/:id`} exact={true}>
              <OrderContext />
            </Route>
          </Modal>
        </Switch>
      )}
    </div>
  );
};
