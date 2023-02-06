import { useRef } from "react";
import "./Modal.css";

export const Modal = ({ modal, setModal, children }) => {
  const overlayRef = useRef();

  const handleOverlay = (evt) => {
    if (evt.target === overlayRef.current) {
      setModal(false);
    }
  };

  return (
    <>
      <div
        ref={overlayRef}
        onClick={(evt) => handleOverlay(evt)}
        className={`overlay ${modal ? "openModal" : ""}`}
      >
        <div className="modal-wrapper">
          <button
            onClick={() => setModal(false)}
            className="btn btn-dark rounded-0 modal-button"
          >
            &times;
          </button>
          <div className="modal-header">
            <h3>Post</h3>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </>
  );
};
