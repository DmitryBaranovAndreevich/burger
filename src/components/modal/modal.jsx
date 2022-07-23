import modalStyles from "./modal.module.css";
import { ModalOverlay } from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export function Modal(props) {
  const history = useHistory();
  const { getOrderNumberRequest } = useSelector((store) => store.orderNumber);

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  const onKeydown = (e) => {
    e.stopPropagation();
    if (e.key === "Escape") {
      history.goBack();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);

    return () => document.removeEventListener("keydown", onKeydown);
  }, []);

  return (
    <ModalOverlay>
      <div className={modalStyles.container}>
        {!getOrderNumberRequest && (
          <button onClick={back} className={modalStyles.closeButton}>
            <CloseIcon />
          </button>
        )}
        {props.children}
      </div>
    </ModalOverlay>
  );
}
