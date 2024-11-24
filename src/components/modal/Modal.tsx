// Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 h-full flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Agregar un nuevo plan</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <span className="font-semibold">X</span>
          </button>
        </div>
        <div className="mt-4">
          {children} 
        </div>
      </div>
    </div>
  );
};

export default Modal;