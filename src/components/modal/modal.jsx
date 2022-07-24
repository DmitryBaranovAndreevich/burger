import modalStyles from "./modal.module.css";
import { ModalOverlay } from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";

export function Modal({onClose,children,visible}) {
 
  const onKeydown = (e) => {
    if (e.key === "Escape") {
     onClose(e);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);

    return () => document.removeEventListener("keydown", onKeydown);
  }, []);

  return (
    <ModalOverlay>
      <div className={modalStyles.container}>
        {!visible && (
          <button onClick={onClose} className={modalStyles.closeButton}>
            <CloseIcon />
          </button>
        )}
        {children}
      </div>
    </ModalOverlay>
  );
}
