import React, { useRef } from "react";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dataPropTypes } from "../../utils/data.jsx";
import { useState } from 'react';
 


const Tabs = (props) => {
  const [current, setCurrent] = React.useState("one");

  const scroll = (element, container) => {
    container.current.scrollTop =
      element.current.offsetTop - container.current.offsetTop;
  };
      
  return (
    
    <div className={burgerIngredientsStyles.tabContainer}>
      <Tab
        value="bun"
        active={current === "one"}
        onClick={() => {
          setCurrent("one");
          scroll(props.links.linkToBun, props.links.container);
        }}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === "two"}
        onClick={() => {
          setCurrent("two");
          scroll(props.links.linkToSauce, props.links.container);
        }}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={current === "three"}
        onClick={() => {
          setCurrent("three");
          scroll(props.links.linkToMain, props.links.container);
        }}
      >
        Начинки
      </Tab>
    </div>
  );
};

Tabs.propTypes = {
  links: PropTypes.objectOf(PropTypes.shape({ current: PropTypes.instanceOf(Element), })).isRequired,
};

class Ingredient extends React.Component {
  render() {
    return (
      <li className={`${burgerIngredientsStyles.card} mt-6`} onClick={() => this.props.onClick(this.props.productCard)}>
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

Ingredient.propTypes = {
  productCard: dataPropTypes.isRequired,
};

const TypesIngredients = (props) => {
  
    return (
      <div className={burgerIngredientsStyles.test}>
        <h3
          ref={props.link}
          className={`${burgerIngredientsStyles.ingredientsName} text text_type_main-medium `}
        >
          {props.translate}
        </h3>
        <ul className={`${burgerIngredientsStyles.cardsList} pl-4 pr-2`}>
          {props.cards.map(
            (card) =>
              card.type === props.typeIngredients && (
                <Ingredient productCard={card} key={card._id} onClick={props.dataForModal}/>
              )
          )}
        </ul>
      </div>
    );
  }


TypesIngredients.propTypes = {
  typeIngredients: PropTypes.string.isRequired,
  translate: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  link: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};

function BurgerIngredients(props) {
  const refBun = useRef(null);
  const refSauce = useRef(null);
  const refMain = useRef(null);
  
  const scrollContainer = useRef(null);
  
  const state = {
    linkToBun: refBun,
    linkToSauce: refSauce,
    linkToMain: refMain,
    container: scrollContainer,
  };

  return (
    <div className={`${burgerIngredientsStyles.wrapper} pt-10`}>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <Tabs links={state} />
      <div
        ref={scrollContainer}
        className={`${burgerIngredientsStyles.ingredientsContainer} mt-10`}
      >
        <TypesIngredients
          dataForModal={props.modalState}
          typeIngredients={"bun"}
          translate={"Булки"}
          cards={props.cards}
          link={refBun}
        />
        <TypesIngredients
          dataForModal={props.modalState}
          typeIngredients={"sauce"}
          translate={"Соусы"}
          cards={props.cards}
          link={refSauce}
        />
        <TypesIngredients
          dataForModal={props.modalState}
          typeIngredients={"main"}
          translate={"Начинка"}
          cards={props.cards}
          link={refMain}
        />
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  cards: PropTypes.arrayOf(dataPropTypes.isRequired),
};

export default BurgerIngredients;
