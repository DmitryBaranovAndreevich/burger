import modalOverlayStyles from "./modalOverlayStyles.module.css";
import PropTypes from "prop-types";

function ModalOverlay(props) {
  const onClickOverlay = (e) => {
    e.target.classList.contains(modalOverlayStyles.overlay) &&
      props.closePopup();
  };

  return (
    <div className={modalOverlayStyles.overlay} onClickCapture={onClickOverlay}>
      {props.children}
    </div>
  );
}

ModalOverlay.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export { ModalOverlay };
