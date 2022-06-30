import React, { useRef } from "react";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dataPropTypes } from "../../utils/data.jsx";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

const Tabs = ({ current, links, setCurrent }) => {
  const { linkToBun, container, linkToSauce, linkToMain } = links;

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
          scroll(linkToBun, container);
        }}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === "two"}
        onClick={() => {
          setCurrent("two");
          scroll(linkToSauce, container);
        }}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={current === "three"}
        onClick={() => {
          setCurrent("three");
          scroll(linkToMain, container);
        }}
      >
        Начинки
      </Tab>
    </div>
  );
};

Tabs.propTypes = {
  links: PropTypes.objectOf(
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ).isRequired,
  current: PropTypes.string.isRequired,
  setCurrent: PropTypes.func.isRequired
};

function Ingredient({ onClick, productCard }) {
  const { constructorItems } = useSelector(
    (store) => store.burgerConstructorList
  );

  const counter = constructorItems.find((el) => el._id === productCard._id);

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: productCard,
  });

  return (
    <li
      ref={dragRef}
      className={`${burgerIngredientsStyles.card} mt-6`}
      onClick={() => {
        onClick(productCard);
      }}
    >
      {counter && <Counter count={counter.count} size="default" />}
      <img
        src={productCard.image_large}
        alt=""
        className={burgerIngredientsStyles.cardImage}
      />
      <p
        className={`${burgerIngredientsStyles.price} text text_type_digits-default`}
      >
        {productCard.price}
        <CurrencyIcon type="primary" />
      </p>
      <p
        className={`${burgerIngredientsStyles.name} text text_type_main-default`}
      >
        {productCard.name}
      </p>
    </li>
  );
}

Ingredient.propTypes = {
  productCard: dataPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
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
              <Ingredient
                productCard={card}
                key={card._id}
                onClick={props.dataForModal}
              />
            )
        )}
      </ul>
    </div>
  );
};

TypesIngredients.propTypes = {
  typeIngredients: PropTypes.string.isRequired,
  translate: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  link: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
  dataForModal: PropTypes.func.isRequired,
};

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("one");
  const cards = useSelector((store) => store.ingredientsList.items);

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

  const handelScroll = (e) => {
    let containerScroll = e.target.scrollTop;
    let bunScroll = Math.abs(
      refBun.current.offsetTop -
        scrollContainer.current.offsetTop +
        containerScroll
    );
    let sauceScroll = Math.abs(
      containerScroll -
        (refSauce.current.offsetTop - scrollContainer.current.offsetTop)
    );
    let mainScroll = Math.abs(
      containerScroll -
        (refMain.current.offsetTop - scrollContainer.current.offsetTop)
    );

    const arr = [bunScroll, sauceScroll, mainScroll];

    if (bunScroll === Math.min(...arr)) setCurrent("one");
    if (sauceScroll === Math.min(...arr)) setCurrent("two");
    if (mainScroll === Math.min(...arr)) setCurrent("three");
  };

  return (
    <div className={`${burgerIngredientsStyles.wrapper} pt-10`}>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <Tabs links={state} current={current} setCurrent={setCurrent} />
      <div
        ref={scrollContainer}
        className={`${burgerIngredientsStyles.ingredientsContainer} mt-10`}
        onScroll={handelScroll}
      >
        <TypesIngredients
          dataForModal={props.modalState}
          typeIngredients={"bun"}
          translate={"Булки"}
          cards={cards}
          link={refBun}
        />
        <TypesIngredients
          dataForModal={props.modalState}
          typeIngredients={"sauce"}
          translate={"Соусы"}
          cards={cards}
          link={refSauce}
        />
        <TypesIngredients
          dataForModal={props.modalState}
          typeIngredients={"main"}
          translate={"Начинка"}
          cards={cards}
          link={refMain}
        />
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  modalState: PropTypes.func.isRequired,
};

export default BurgerIngredients;
