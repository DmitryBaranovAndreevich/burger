import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader.jsx";
import BurgerIngredients from "../burgerIngredients/burgerIngredients.jsx";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import IngredientDetails from "../ingredientDetails/IngredientDetails";
import Modal from "../modal/modal";
import { useEffect, useState } from "react";
import OrderDetails from "../orderDetails/orderDetails";
import { Order } from "../../services/order";
import  {API_INGREDIENTS} from '../../utils/config';

function App() {
  const [data, setState] = useState(null);
  const [isModal, setModal] = useState(false);
  const [modalScreen, setModalScreen] = useState(null);
  const [modalState, setModalState] = useState(null);

  const changeModalState = (data) => {
    setModalState(data);
  };

  const isOpen = (data) => {
    setModal(true);
    changeModalState(data);
  };

  const isClose = () => {
    setModal(false);
    changeModalState(null);
  };

  const isOpenIngredient = (card) => {
    isOpen();
    changeModalState(card);
    setModalScreen("IngredientDetails");
  };

  const isOpenOrder = (data) => {
    isOpen(data);
    setModalScreen("OrderDetails");
  };

  useEffect(() => {
    fetch(API_INGREDIENTS)
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((dataFromServer) => {
        setState(dataFromServer.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    data && (
      <div className={`${appStyles.body} pt-10 pr-10 pl-10`}>
        <AppHeader />
        <div className={appStyles.main}>
          <BurgerIngredients cards={data} modalState={isOpenIngredient} />
          <Order.Provider value={data}>
            <BurgerConstructor openPopup={isOpenOrder} />
          </Order.Provider>
        </div>
        {isModal && (
          <Modal handelCloseModal={isClose}>
            {modalScreen === "IngredientDetails" && (
              <IngredientDetails {...modalState} />
            )}
              {modalScreen === "OrderDetails" && <OrderDetails {...modalState}/>}
          </Modal>
        )}
      </div>
    )
  );
}

export default App;
