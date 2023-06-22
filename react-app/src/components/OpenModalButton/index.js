import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // Component to render inside the modal
  buttonText, // Text of the button that opens the modal
  onButtonClick, // Callback function that will be called once button is clicked
  onModalClose // Callback function that will be called once modal is closed
}) {

  const { setModalContent, setOnModalClose } = useModal()

  const onClick = () => {
    if (typeof onButtonClick === 'function') onButtonClick()
    if (typeof onModalClose === 'function') setOnModalClose(onModalClose)
    setModalContent(modalComponent)
  }


  return (
    <button onClick={onClick}>{buttonText}</button>
  );
}

export default OpenModalButton;