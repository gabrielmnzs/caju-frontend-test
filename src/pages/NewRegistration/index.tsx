import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HiOutlineArrowLeft } from 'react-icons/hi';

import routes from '~/router/routes';
import * as RegistrationService from '~/services/registrations';
import { cpf, removeSpecialChars } from '~/utils';
import { Registration } from '~/types';
import { Status } from '~/constants';
import { useLoader } from '~/hooks/loader';
import { showToast } from '~/hooks/toast';

import TextField from '~/components/TextField';
import { IconButton, Button } from '~/components/Buttons';
import { newRegistrationSchema } from '~/schemas';

import * as S from './styles';

type newRegistrationPageSchema = z.infer<typeof newRegistrationSchema>;

const NewRegistrationPage = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<newRegistrationPageSchema>({
    resolver: zodResolver(newRegistrationSchema),
  });
  const formRef = useRef<HTMLFormElement>(null);
  const { setLoading } = useLoader();

  const goToDashboard = () => {
    history.push(routes.dashboard);
  };

  const handleNewRegistration = async (data: newRegistrationPageSchema) => {
    try {
      setLoading(true);
      data.date = formatDate(data.date);

      const registration: Omit<Registration, 'id'> = {
        employeeName: data.name,
        email: data.email,
        cpf: removeSpecialChars(data.document),
        admissionDate: data.date,
        status: Status.REVIEW,
      };

      await RegistrationService.create(registration);

      history.push(routes.dashboard);

      showToast({
        type: 'success',
        message: `Item cadastrado com sucesso!`,
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: `Erro ao cadastrar o item. Por favor, tente novamente.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = cpf(event.target.value);
    setValue('document', maskedValue, { shouldValidate: true });
  };

  function formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  return (
    <S.Container>
      <S.Card>
        <IconButton
          $hasBorder={true}
          color='#64a98c'
          onClick={() => goToDashboard()}
          aria-label='back'
        >
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <form ref={formRef} onSubmit={handleSubmit(handleNewRegistration)}>
          <TextField
            placeholder='Nome'
            label='Nome'
            {...register('name')}
            error={errors.name && errors.name.message}
          />
          <TextField
            placeholder='Email'
            label='Email'
            {...register('email')}
            error={errors.email && errors.email.message}
          />
          <TextField
            placeholder='CPF'
            label='CPF'
            {...register('document')}
            onChange={handleCPFChange}
            error={errors.document && errors.document.message}
          />
          <TextField
            label='Data de admissão'
            type='date'
            {...register('date')}
            error={errors.date && errors.date.message}
          />
          <Button
            color='#FFFFFF'
            $bgColor='#64a98c'
            $size='large'
            type='submit'
          >
            Cadastrar
          </Button>
        </form>
      </S.Card>
    </S.Container>
  );
};

export default NewRegistrationPage;
