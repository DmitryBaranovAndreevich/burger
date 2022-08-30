import modalStyles from "./modal.module.css";
import { ModalOverlay } from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { ReactNode, useEffect } from "react";

type TModal = {
  onClose: (e: React.MouseEvent | KeyboardEvent) => void;
  children: ReactNode;
  visible?: boolean;
};

export function Modal({ onClose, children, visible }: TModal) {
  const onKeydown = (e: KeyboardEvent) => {
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
            <CloseIcon type="primary" />
          </button>
        )}
        {children}
      </div>
    </ModalOverlay>
  );
}
