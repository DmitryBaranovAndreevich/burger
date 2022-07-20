import { MainPage } from "./main";
import { IngredientDetails } from "../components/ingredientDetails/IngredientDetails";
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
        <Route path="/ingredients/:id">
          <Modal>
            <IngredientDetails/>
          </Modal>
        </Route>
      )}
    </div>
  );
};
