import modalOverlayStyles from "./modalOverlayStyles.module.css";
import {useHistory} from 'react-router-dom';

function ModalOverlay(props) {
  const history = useHistory();
  const onClickOverlay = (e) => {
    e.target.classList.contains(modalOverlayStyles.overlay) &&
    history.goBack();
  };

  return (
    <div className={modalOverlayStyles.overlay} onClickCapture={onClickOverlay}>
      {props.children}
    </div>
  );
}

export { ModalOverlay };
