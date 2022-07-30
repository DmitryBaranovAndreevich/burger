import styles from "./ordersHistory.module.css";
import { Order } from "../order/order";
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { wsUserConnectionStart } from '../../services/actions/wsActions';

export const UserOrdersList = () => {
   const dispatch = useDispatch();
  const { isLoadingOn } = useSelector((store) => store.user);
  const {userOrdersList,wsConnected} = useSelector(store => store.ordersList);
  const {orders,total,totalToday} = userOrdersList;

    useEffect(() => {
    dispatch(wsUserConnectionStart())
  },[isLoadingOn])

// console.log(userOrdersList)
  return (
    <div className={styles.wrapper}>
      <Order />
      <Order />
      <Order />
    </div>
  );
};
