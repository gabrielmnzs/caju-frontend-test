import React, { createContext, useContext, useState, ReactNode } from 'react';

import { generateModalMessage } from '~/utils/generators/generate-modal-message';

interface ModalContextProps {
  showModal: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  openModal: (message: string, onConfirm: () => void) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const openModal = (action: string, onConfirm: () => void) => {
    const message = generateModalMessage(action);
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        message,
        onConfirm,
        onCancel: closeModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};
