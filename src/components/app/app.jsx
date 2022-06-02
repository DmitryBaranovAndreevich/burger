import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader.jsx";
import BurgerIngredients from "../burgerIngredients/burgerIngredients.jsx";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import IngredientDetails from "../ingredientDetails/IngredientDetails";
import Modal from "../modal/modal";
import { useEffect, useState } from "react";
import OrderDetails from "../orderDetails/orderDetails";

function App() {
  const API_INGREDIENTS = "https://norma.nomoreparties.space/api/ingredients";
  const [data, setState] = useState();
  const [isModal, setModal] = useState(false);
  const [modalScreen, setModalScreen] = useState();
  const [modalState, setModalState] = useState();


  const changeModalState = (data) => {
    setModalState(data);
  }

  const isOpen = (data) => {
    setModal(true)
    changeModalState(data)
  };

  const isClose = () => {
    setModal(false);
    changeModalState();
  };

  const isOpenIngredient = (card) => {
    isOpen();
    changeModalState(card);
    setModalScreen('IngredientDetails');
  }

  const isOpenOrder = () => {
    isOpen();
    setModalScreen('OrderDetails');
  }
   
  
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
          <BurgerIngredients cards={data} modalState={isOpenIngredient}/>
          <BurgerConstructor data={data} openPopup={isOpenOrder}/>
        </div>
       {isModal&&<Modal handelCloseModal={isClose} >
         {modalScreen==='IngredientDetails'&&(<IngredientDetails {...modalState}/>)}
         {modalScreen==='OrderDetails'&&(<OrderDetails/>)}
         </Modal>}
      </div>
    )
  )
}

export default App;
