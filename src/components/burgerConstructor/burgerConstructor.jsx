import React, { useContext } from "react";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
// import { dataPropTypes } from "../../utils/data.jsx";
import { Order } from "../../utils/order";

function IngredientsCard(props) {
  return (
    <li className={burgerConstructorStyles.ingredient}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.ingredient.name}
        thumbnail={props.ingredient.image}
        price={props.ingredient.price}
      />
    </li>
  );
}

IngredientsCard.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

function FinalPrice() {
  const data = useContext(Order);

  return (
    <p
      className={`${burgerConstructorStyles.price} text text_type_digits-medium`}
    >
      {data.reduce((priv, elem) => {
        if (elem.type === "bun") return priv + elem.price * 2;
        return priv + elem.price;
      }, 0)}
      <CurrencyIcon type="primary" />
    </p>
  );
}

function BurgerConstructor(props) {
  const data = useContext(Order);
  const API_ORDERS = "https://norma.nomoreparties.space/api/orders";

  const buttonOnClick = () => {
    fetch(API_ORDERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: data.map((elem) => elem._id) }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((dataFromServer) => {
        props.openPopup(dataFromServer.order);
      })
      .catch((err) => console.log(err));
  };

  const ingredientTypeBun = data.find(
    (ingredient) => ingredient.type === "bun"
  );

  return (
    <div className={`${burgerConstructorStyles.container} pl-4 pt-25`}>
      <div className={burgerConstructorStyles.wrapper}>
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={`${ingredientTypeBun.name} (верх)`}
          thumbnail={ingredientTypeBun.image}
          price={ingredientTypeBun.price}
        />
        <ul className={burgerConstructorStyles.ingredientsList}>
          {data.map(
            (ingredient, index) =>
              ingredient.type !== "bun" && (
                <IngredientsCard ingredient={ingredient} key={index} />
              )
          )}
        </ul>
        <ConstructorElement
          type={"bottom"}
          isLocked={true}
          text={`${ingredientTypeBun.name} (низ)`}
          thumbnail={ingredientTypeBun.image}
          price={ingredientTypeBun.price}
        />
      </div>
      <div className={`${burgerConstructorStyles.priceWrapper} mr-4 mt-10`}>
        <FinalPrice />
        <Button type="primary" size="medium" onClick={buttonOnClick}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  openPopup: PropTypes.func.isRequired,
};

export default BurgerConstructor;
