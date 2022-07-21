import { MainPage } from "./main";
import { IngredientDetails } from "../components/ingredientDetails/IngredientDetails";
import { OrderDetails } from '../components/orderDetails/orderDetails';
import { Modal } from "../components/modal/modal";
import {
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

export const ModalSwitch = () => {
  const location = useLocation();
  const modal = location.state?.modal;
  return (
    <div>
      <Switch location={modal || location}>
        <Route path="/" exact={true}>
          <MainPage />
        </Route>
        <Route path="/ingredients/:id">
          <IngredientDetails />
        </Route>
      </Switch>
      {modal && (
        <Switch>
        <Route path="/ingredients/:id" exact={true}>
          <Modal>
            <IngredientDetails/>
          </Modal>
        </Route>
        <Route path="/order" exact={true}>
          <Modal>
            <OrderDetails/>
          </Modal>
        </Route>
        </Switch>
      )}
    </div>
  );
};
