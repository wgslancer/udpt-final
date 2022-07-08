import { ReactNode } from "react";
import { createPortal } from "react-dom";

const modalElement = document.getElementById("modal");

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  const handleOnClickOutside = () => {
    handleClose();
  };

  return !isOpen || !modalElement
    ? null
    : createPortal(
        <div className="absolute top-0 left-0 overflow-hidden min-h-screen min-w-full flex-center-center">
          <div
            onClick={handleOnClickOutside}
            className="absolute top-0 left-0 bg-black opacity-30 h-full w-full z-0"
          ></div>
          <div className="relative z-10 overflow-y-auto">{children}</div>
        </div>,
        modalElement
      );
};

export default Modal;
