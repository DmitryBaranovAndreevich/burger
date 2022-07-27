import styles from "./ordersHistory.module.css";
import { Order } from "../order/order";

export const OrdersList = () => {
  return (
    <div className={styles.wrapper}>
      <Order />
      <Order />
      <Order />
    </div>
  );
};
