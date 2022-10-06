import modalOverlayStyles from "./modalOverlayStyles.module.css";
import { useHistory } from "react-router-dom";
import { ReactNode } from "react";

function ModalOverlay(props: { children: ReactNode }) {
  const history = useHistory();
  const onClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).classList.contains(
      modalOverlayStyles.overlay
    ) && history.goBack();
  };

  return (
    <div className={modalOverlayStyles.overlay} onClickCapture={onClickOverlay}>
      {props.children}
    </div>
  );
}

export { ModalOverlay };
