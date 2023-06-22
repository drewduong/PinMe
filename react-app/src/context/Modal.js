import React, { useContext, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

// Setting up context for modal
const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  // Using useRef instead of useState to prevent constant re-renders
  const modalRef = useRef();

  // Two component state variables
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null); // Clear the modal contents

    // If callback function is truthy, call the callback function and reset it to null
    if (typeof onModalClose === 'function') {
      setOnModalClose(null)
      onModalClose()
    }

  }


  const contextValue = {
    modalRef, // Reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // Function to set the React component to render inside modal
    setOnModalClose, // Function to set the callback function to be called when modal is closing
  }

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const modalNode = useContext(ModalContext);
  const { modalRef, modalContent, closeModal } = useContext(ModalContext)
  // If there is no div referenced by the modalRef or onModalOpen
  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}