import modalOverlayStyles from './modalOverlayStyles.module.css'

function ModalOverlay(props) {
  return (
    <div className={modalOverlayStyles.overlay} onClick={props.closePopup}>
      {props.children}
    </div>
  )
}

export { ModalOverlay}; 