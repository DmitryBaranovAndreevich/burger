import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader.jsx";
import BurgerIngredients from "../burgerIngredients/burgerIngredients.jsx";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import IngredientDetails from "../ingredientDetails/IngredientDetails";
import Modal from "../modal/modal";
import { useEffect, useState } from "react";
import OrderDetails from "../orderDetails/orderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../services/actions/burgerIngredients";
import {
  addItemBurgerConstructor,
  changeIngredient,
  deleteOrder,
} from "../../services/actions/burgerConstructor";
import { getOrderNumber } from "../../services/actions/orderDetals";
import {
  getIngredientDetals,
  deleteIngredientDetals,
} from "../../services/actions/ingredientsDetals";
import { getOrderNumberFailed } from "../../services/actions/orderDetals";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../spinner/spinner";

function App() {
  const [isModal, setModal] = useState(false);

  const dispatch = useDispatch();

  const { itemsFailed } = useSelector((store) => store.ingredientsList);

  const { constructorItems } = useSelector(
    (store) => store.burgerConstructorList
  );

  const { isOpenIngredienDetals } = useSelector(
    (store) => store.ingredienDetals
  );

  const { isOpenOrderDetals, getOrderNumberRequest } = useSelector(
    (store) => store.orderNumber
  );

  const isOpen = () => {
    setModal(true);
  };

  const isClose = () => {
    setModal(false);
    isOpenIngredienDetals && dispatch(deleteIngredientDetals());
    if (isOpenOrderDetals) {
      dispatch(getOrderNumberFailed());
      dispatch(deleteOrder());
    }
  };

  const isOpenIngredient = (cart) => {
    dispatch(getIngredientDetals(cart));
    isOpen();
  };

  const isOpenOrder = () => {
    dispatch(getOrderNumber(constructorItems));
    isOpen();
  };

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const handleDrop = (item) => {
    const newItem = { ...item, ["key"]: uuidv4() };
    const isBun = constructorItems.some((element) => element.type === "bun");
    if (item.type === "bun" && !isBun) dispatch(addItemBurgerConstructor(item));
    else if (item.type === "bun" && isBun) dispatch(changeIngredient(item));
    else dispatch(addItemBurgerConstructor(newItem));
  };
  const visible = getOrderNumberRequest?false:true

  return (
    <div className={`${appStyles.body} pt-10 pr-10 pl-10`}>
      <AppHeader />
      <div className={appStyles.main}>
        <DndProvider backend={HTML5Backend}>
          {!itemsFailed && <BurgerIngredients modalState={isOpenIngredient} />}
          <BurgerConstructor openPopup={isOpenOrder} handleDrop={handleDrop} />
        </DndProvider>
      </div>
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
