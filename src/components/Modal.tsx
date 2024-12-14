import React from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode; // Added footer prop
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, footer }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-dark-card rounded-md p-4 w-96">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-bold dark:text-white">{title}</h2>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          Close
        </button>
      </div>
      {/* Body */}
      <div className="mt-4">{children}</div>
      {/* Footer */}
      {footer && <div className="mt-4 flex justify-end">{footer}</div>}
    </div>
  </div>
);

export default Modal;
