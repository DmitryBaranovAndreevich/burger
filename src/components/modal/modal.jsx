import modalStyles from "./modal.module.css";
import { ModalOverlay } from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import { useEffect } from "react";

function Modal(props) {
  const modalRoot = document.querySelector("#react-modals");
   
  useEffect(() => {
    const onKeydown = (e) => {
      console.log(e);
      if (e.key === "Escape") {
        props.handelCloseModal();
      }
    };
       document.addEventListener("keydown", onKeydown);

    return () => document.removeEventListener("keydown", onKeydown);
    
  },[]);

  return (
    ReactDOM.createPortal(
      <ModalOverlay closePopup={props.handelCloseModal}>
        <div className={modalStyles.container} >
          <button
            onClick={props.handelCloseModal}
            className={modalStyles.closeButton}
          >
            <CloseIcon />
          </button>
          {props.children}
        </div>
      </ModalOverlay>,
      modalRoot
    )
  );
}

export default Modal ;
