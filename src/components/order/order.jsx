import styles from "./order.module.css";
import { data } from "../../utils/data";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";


export const Order = () => {
 
  const elementsList = data.map((el, index) => {
    if (index === 0) {
      return (
        <li key={index} className={styles.icon}>
          <img className={styles.image} src={`${el.image_mobile}`} alt="" />
          {data.length>5&&<p className={styles.counter}>{`+${data.length - 5}`}</p>}
        </li>
      );
    }
    if (index < 6) {
      return (
        <li key={index} className={styles.icon}>
          <img className={styles.image} src={`${el.image_mobile}`} alt="" />
        </li>
      );
    }
    return;
  });

  return (
    <Link className={styles.wrapper}>
    {/* <div className={styles.wrapper}> */}
      <div className={styles.container}>
        <p className={`${styles.orderId} text text_type_digits-default`}>
          #034535
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </p>
      </div>
      <h3 className={`${styles.title} text text_type_main-medium`}>
        Death Star Starship Main бургер
      </h3>
      <p className={`${styles.status} text text_type_main-default`}>Создан</p>
      <div className={styles.footer}>
        <ul className={styles.iconsList}>{elementsList}</ul>
        <p className={`${styles.prise} text text_type_digits-default`}>689<CurrencyIcon type="primary"/></p>
      </div>
    {/* </div> */}
    </Link>
  );
};
