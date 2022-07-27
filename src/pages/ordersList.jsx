import styles from "./ordersList.module.css";
import { Order } from "../components/order/order";

export const OrdersList = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Лента заказов
      </h2>
      <div className={styles.container}>
        <div></div>
        <div className={styles.orders}>
          <Order />
          <Order />
          <Order />
          <Order />
        </div>
        <div className={styles.board}>
          <div className={styles.ordersContainer}>
          
            <div>
              <p className="text text_type_main-medium">Готовы:</p>
              <ul className={styles.list}>
                <li
                  className={`${styles.makeOrder} text text_type_digits-default`}
                >
                  034533
                </li>
                <li
                  className={`${styles.makeOrder} text text_type_digits-default`}
                >
                  034532
                </li>
              </ul>
            </div>
            <div>
              <p className="text text_type_main-medium">В работе:</p>
              <ul className={styles.list}>
                <li className={`${styles.finishOrder} text text_type_digits-default`}>034538</li>
                <li className={`${styles.finishOrder} text text_type_digits-default`}>034541</li>
              </ul>
            </div>
        </div>
            <div className={styles.ordersCounter}>
              <p className='text text_type_main-medium'>Готовы за все время:</p>
              <p className="text text_type_digits-large">28753</p>
            </div>
            <div className={styles.ordersCounter}>
              <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
              <p className="text text_type_digits-large">28753</p>
            </div>
          </div>
        
      </div>
    </div>
  );
};
