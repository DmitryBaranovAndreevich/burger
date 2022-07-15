import orderDetailsStyle from "./orderDetails.module.css";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { orderNumber } = useSelector((store) => store.orderNumber);
  return (
    <div className={orderDetailsStyle.wrapper}>
      <h3 className={`${orderDetailsStyle.title} text text_type_digits-large`}>
        {orderNumber}
      </h3>
      <p className={"text text_type_main-medium mt-8"}>интендификатор заказа</p>
      <div className={`${orderDetailsStyle.iconContainer} mt-15`}></div>
      <p className="text text_type_main-small mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive mt-3">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;