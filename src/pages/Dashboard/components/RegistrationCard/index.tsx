import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from 'react-icons/hi';

import * as RegistrationService from '~/services/registrations';
import { Action, Status } from '~/constants';
import { Registration, RegistrationStatus } from '~/types';
import { useLoader } from '~/hooks/loader';
import { useModal } from '~/hooks/modal';
import { showToast } from '~/hooks/toast';
import { IconButton, Button } from '~/components/Buttons';

import * as S from './styles';

interface RegistrationCardProps {
  data: Registration;
  onUpdate: () => void;
}

export const RegistrationCard = ({ data, onUpdate }: RegistrationCardProps) => {
  const { setLoading } = useLoader();
  const { openModal } = useModal();

  const handleStatusChange = async (
    data: Registration,
    status: RegistrationStatus
  ) => {
    try {
      setLoading(true);

      const updatedData: Registration = {
        ...data,
        status,
      };

      await RegistrationService.put(updatedData);

      onUpdate();
      showToast({
        type: 'success',
        message: `Status do item atualizado com sucesso!`,
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: `Erro ao atualizar o status do item. Por favor, tente novamente.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRegistration = async (data: Registration) => {
    try {
      setLoading(true);

      await RegistrationService.remove(data);

      onUpdate();
      showToast({
        type: 'success',
        message: `Item removido com sucesso!`,
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: `Erro ao remover o item. Por favor, tente novamente.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Card data-testid='registration-card'>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <S.ContainerButtons>
          <Button
            $size='small'
            $bgColor='rgb(255, 145, 154)'
            onClick={() =>
              openModal(Action.REPROVED, () =>
                handleStatusChange(data, Status.REPROVED)
              )
            }
            $isVisible={data.status === Status.REVIEW}
          >
            Reprovar
          </Button>
          <Button
            $size='small'
            $bgColor='rgb(155, 229, 155)'
            onClick={() =>
              openModal(Action.APPROVED, () =>
                handleStatusChange(data, Status.APPROVED)
              )
            }
            $isVisible={data.status === Status.REVIEW}
          >
            Aprovar
          </Button>
          <Button
            $size='small'
            $bgColor='#ff8858'
            onClick={() =>
              openModal(Action.REVIEW, () =>
                handleStatusChange(data, Status.REVIEW)
              )
            }
            $isVisible={data.status !== Status.REVIEW}
          >
            Revisar novamente
          </Button>
        </S.ContainerButtons>

        <IconButton
          aria-label='delete-button'
          onClick={() =>
            openModal(Action.DELETE, () => handleRemoveRegistration(data))
          }
        >
          <HiOutlineTrash />
        </IconButton>
      </S.Actions>
    </S.Card>
  );
};
