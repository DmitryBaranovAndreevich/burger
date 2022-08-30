import React, { useRef, RefObject } from "react";
import styles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../hooks/types";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredient } from "../../utils/data";

type TTabs = {
  readonly current: string;
  readonly links: { [name: string]: RefObject<HTMLElement> };
  readonly setCurrent: (arg: string) => void;
};

const Tabs = ({ current, links, setCurrent }: TTabs) => {
  const { linkToBun, container, linkToSauce, linkToMain } = links;

  const scroll = (
    element: RefObject<HTMLElement>,
    container: RefObject<HTMLElement>
  ) => {
    (container.current as HTMLElement).scrollTop =
      (element.current as HTMLElement).offsetTop -
      (container.current as HTMLElement).offsetTop;
  };

  return (
    <div className={styles.tabContainer}>
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

type TIngredient = {
  readonly productCard: IIngredient;
};

const Ingredient = ({ productCard }: TIngredient) => {
  const { constructorItems } = useSelector(
    (store) => store.burgerConstructorList
  );

  const counter = constructorItems.filter(
    (el: IIngredient) => el._id === productCard._id
  );

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: productCard,
  });

  return (
    <li ref={dragRef} className={`${styles.card} mt-6`}>
      {counter.length !== 0 && (
        <Counter
          count={productCard.type === "bun" ? 2 : counter.length}
          size="default"
        />
      )}
      <img src={productCard.image_large} alt="" className={styles.cardImage} />
      <p className={`${styles.price} text text_type_digits-default`}>
        {productCard.price}
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${styles.name} text text_type_main-default`}>
        {productCard.name}
      </p>
    </li>
  );
};

type TIngredients = {
  readonly typeIngredients: string;
  readonly translate: string;
  readonly cards: Array<IIngredient> | null;
  readonly link: RefObject<HTMLHeadingElement>;
};

const TypesIngredients = (props: TIngredients) => {
  let location = useLocation();
  return (
    <div className={styles.test}>
      <h3
        ref={props.link}
        className={`${styles.ingredientsName} text text_type_main-medium `}
      >
        {props.translate}
      </h3>
      <ul className={`${styles.cardsList} pl-4 pr-2`}>
        {props.cards?.map(
          (card: IIngredient) =>
            card.type === props.typeIngredients && (
              <Link
                to={{
                  pathname: `/ingredients/${card._id}`,
                  state: { modal: location, position: "modalSwitch" },
                }}
                className={styles.link}
                key={card._id}
              >
                <Ingredient productCard={card} />
              </Link>
            )
        )}
      </ul>
    </div>
  );
};

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");
  const cards = useSelector((store) => store.ingredientsList.items);

  const refBun = useRef<HTMLHeadingElement>(null);
  const refSauce = useRef<HTMLHeadingElement>(null);
  const refMain = useRef<HTMLHeadingElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);

  const state = {
    linkToBun: refBun,
    linkToSauce: refSauce,
    linkToMain: refMain,
    container: scrollContainer,
  };

  const handelScroll = (e: React.UIEvent<HTMLDivElement>) => {
    let containerScroll = (e.target as HTMLDivElement).scrollTop;
    let bunScroll = Math.abs(
      refBun.current!.offsetTop -
        scrollContainer.current!.offsetTop +
        containerScroll
    );
    let sauceScroll = Math.abs(
      containerScroll -
        (refSauce.current!.offsetTop - scrollContainer.current!.offsetTop)
    );
    let mainScroll = Math.abs(
      containerScroll -
        (refMain.current!.offsetTop - scrollContainer.current!.offsetTop)
    );

    const arr = [bunScroll, sauceScroll, mainScroll];

    if (bunScroll === Math.min(...arr)) setCurrent("one");
    if (sauceScroll === Math.min(...arr)) setCurrent("two");
    if (mainScroll === Math.min(...arr)) setCurrent("three");
  };

  return (
    <div className={`${styles.wrapper} pt-10`}>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <Tabs links={state} current={current} setCurrent={setCurrent} />
      <div
        ref={scrollContainer}
        className={`${styles.ingredientsContainer} mt-10`}
        onScroll={handelScroll}
      >
        <TypesIngredients
          typeIngredients={"bun"}
          translate={"Булки"}
          cards={cards}
          link={refBun}
        />
        <TypesIngredients
          typeIngredients={"sauce"}
          translate={"Соусы"}
          cards={cards}
          link={refSauce}
        />
        <TypesIngredients
          typeIngredients={"main"}
          translate={"Начинка"}
          cards={cards}
          link={refMain}
        />
      </div>
    </div>
  );
}

export default BurgerIngredients;
