import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
const Backdrop = (props) => (
  <div className={classes.backdrop} onClick={props.hideHandler} />
);
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

export default function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop hideHandler={props.onHide} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}
