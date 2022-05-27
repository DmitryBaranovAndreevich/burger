import React from "react";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
import PropTypes from 'prop-types'; 
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dataPropTypes } from '../../utils/data.jsx';

function scroll(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Tabs = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <div style={{ display: "flex" }}>
      <Tab
        value="bun"
        active={current === "one"}
        onClick={(value) => {
          scroll(value);
          setCurrent("one");
        }}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === "two"}
        onClick={(value) => {
          scroll(value);
          setCurrent("two");
        }}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={current === "three"}
        onClick={(value) => {
          scroll(value);
          setCurrent("three");
        }}
      >
        Начинки
      </Tab>
    </div>
  );
};

class Ingredient extends React.Component {
  render() {
    return (
      <li className={`${burgerIngredientsStyles.card} mt-6`}>
        <Counter count={1} size="default" />
        <img
          src={this.props.productCard.image_large}
          alt=""
          className={burgerIngredientsStyles.cardImage}
        />
        <p
          className={`${burgerIngredientsStyles.price} text text_type_digits-default`}
        >
          {this.props.productCard.price}
          <CurrencyIcon type="primary" />
        </p>
        <p
          className={`${burgerIngredientsStyles.name} text text_type_main-default`}
        >
          {this.props.productCard.name}
        </p>
      </li>
    );
  }
}

class TypesIngredients extends React.Component {
  render() {
    return (
      <div>
        <h3
          className={`${burgerIngredientsStyles.ingredientsName} text text_type_main-medium `}
          id={this.props.typeIngredients}
        >
          {this.props.translate}
        </h3>
        <ul className={`${burgerIngredientsStyles.cardsList} pl-4 pr-2`}>
          {this.props.cards.map(
            (card) =>
              card.type === this.props.typeIngredients && (
                <Ingredient productCard={card} key={card._id} />
              )
          )}
        </ul>
      </div>
    );
  }
}

class BurgerIngredients extends React.Component {
  render() {
    return (
      <div className={`${burgerIngredientsStyles.wrapper} pt-10`}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        <Tabs />
        <div
          className={`${burgerIngredientsStyles.ingredientsContainer} mt-10`}
        >
          <TypesIngredients
            typeIngredients={"bun"}
            translate={"Булки"}
            cards={this.props.cards}
          />
          <TypesIngredients
            typeIngredients={"sauce"}
            translate={"Соусы"}
            cards={this.props.cards}
          />
          <TypesIngredients
            typeIngredients={"main"}
            translate={"Начинка"}
            cards={this.props.cards}
          />
        </div>
      </div>
    );
  }
}

BurgerIngredients.propTypes = {
  cards : PropTypes.arrayOf(dataPropTypes.isRequired)
}

export default BurgerIngredients;
