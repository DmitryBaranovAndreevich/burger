import React, { useRef } from "react";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/data.jsx";

class IngredientsCard extends React.Component {
  render() {
    return (
      <li className={burgerConstructorStyles.ingredient}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={this.props.ingredient.name}
          thumbnail={this.props.ingredient.image}
          price={this.props.ingredient.price}
        />
      </li>
    );
  }
}

IngredientsCard.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }),
}

class FinalPrice extends React.Component {
  render() {
    return (
      <p
        className={`${burgerConstructorStyles.price} text text_type_digits-medium`}
      >
        {this.props.data.reduce((priv, elem) => priv + elem.price, 0)}
        <CurrencyIcon type="primary" />
      </p>
    );
  }
}

FinalPrice.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number.isRequired,
}))
}

function BurgerConstructor(props) {
   
    const ingredientTypeBun = props.data.find(
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
            {props.data.map(
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
          <FinalPrice data={props.data} />
          <Button type="primary" size="medium" onClick={props.openPopup}>
            Оформить заказ
          </Button>
        </div>
      </div>
    );
  }


BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired),
  openPopup: PropTypes.func
};

export default BurgerConstructor;
