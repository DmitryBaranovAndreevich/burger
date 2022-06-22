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
import { GET_ITEMS_BURGER_CONSTRUCTOR } from "../../services/actions/burgerConstructor";
import { getOrderNumber } from "../../services/actions/orderDetals";
import {
  GET_INGREDIENT_DETALS,
  DELETE_INGREDIENT_DETALS,
} from "../../services/actions/ingredientsDetals";
import { DELETE_ORDER_NUMBER } from "../../services/actions/orderDetals";

function App() {
  const [isModal, setModal] = useState(false);

  const dispatch = useDispatch();

  const { items, itemsFailed } = useSelector((store) => store.ingredientsList);
  
  const { constructorItems, constructorItemsFailed } = useSelector(
    (store) => store.burgerConstructorList
  );

  const { isOpenIngredienDetals } = useSelector(
    (store) => store.ingredienDetals
  );

  const { isOpenOrderDetals } = useSelector((store) => store.orderNumber);

  const isOpen = () => {
    setModal(true);
  };

  const isClose = () => {
    setModal(false);
    isOpenIngredienDetals && dispatch({ type: DELETE_INGREDIENT_DETALS });
    isOpenOrderDetals && dispatch({ type: DELETE_ORDER_NUMBER });
  };

  const isOpenIngredient = (cart) => {
    dispatch({ type: GET_INGREDIENT_DETALS, data: cart });
    isOpen();
  };

  const isOpenOrder = () => {
    dispatch(getOrderNumber(constructorItems));
    isOpen();
  };

  useEffect(() => {
    dispatch(getItems());
  }, []);

  useEffect(() => {
    !itemsFailed &&
      dispatch({ type: GET_ITEMS_BURGER_CONSTRUCTOR, data: items });
  }, [items]);

  return (
    <div className={`${appStyles.body} pt-10 pr-10 pl-10`}>
      <AppHeader />
      <div className={appStyles.main}>
        {!itemsFailed && <BurgerIngredients modalState={isOpenIngredient} />}
        {!constructorItemsFailed && (
          <BurgerConstructor openPopup={isOpenOrder} />
        )}
      </div>
      {isModal && (
        <Modal handelCloseModal={isClose}>
          {isOpenIngredienDetals && <IngredientDetails />}
          {isOpenOrderDetals && <OrderDetails />}
        </Modal>
      )}
    </div>
  );
}

export default App;
