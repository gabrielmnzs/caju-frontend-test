import React from 'react';

import { useModal } from '../../hooks/modal';

import { Button } from '../Buttons';
import * as S from './styles';

const ConfirmationModal: React.FC = () => {
  const { showModal, message, onConfirm, onCancel, closeModal } = useModal();

  if (!showModal) return null;

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <S.Overlay>
      <S.Container>
        <S.Header>
          <h3>Confirmar ação</h3>
        </S.Header>
        <S.Body>
          <p>{message}</p>
        </S.Body>
        <S.Footer>
          <Button
            $size='medium'
            $bgColor='#64A98C'
            color='#FFFFFF'
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
          <Button $size='medium' color='#FFFFFF' onClick={onCancel}>
            Cancelar
          </Button>
        </S.Footer>
      </S.Container>
    </S.Overlay>
  );
};

export default ConfirmationModal;
