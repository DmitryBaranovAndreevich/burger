import modalOverlayStyles from './modalOverlayStyles.module.css';
import PropTypes from "prop-types";

function ModalOverlay(props) {
  return (
    <div className={modalOverlayStyles.overlay} onClick={props.closePopup}>
      {props.children}
    </div>
  )
}

ModalOverlay.propTypes = {
  closePopup : PropTypes.func.isRequired
}

export { ModalOverlay}; 