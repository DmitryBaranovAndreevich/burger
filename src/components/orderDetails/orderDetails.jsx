import orderDetailsStyle from "./orderDetails.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const number = useSelector((store) => store.orderNumber.orderNumber);

  return (
    <div className={orderDetailsStyle.wrapper}>
      <h3 className={`${orderDetailsStyle.title} text text_type_digits-large`}>
        {number}
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

OrderDetails.propTypes = PropTypes.shape({
  number: PropTypes.number.isRequired,
}).isRequired;

export default OrderDetails;
