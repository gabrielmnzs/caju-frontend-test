import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';

import routes from '~/router/routes';
import api from '~/utils/network/api';
import * as RegistrationService from '~/services/registrations';
import { showToast } from '~/hooks/toast';
import { LoaderProvider } from '~/hooks/loader';
import { ModalProvider } from '~/hooks/modal';
import ConfirmationModal from '~/components/ModalConfirmation';

import NewRegistrationPage from '~/pages/NewRegistration';

jest.mock('~/services/registrations');
jest.mock('~/hooks/toast');

const mockApi = new MockAdapter(api);

describe('NewRegistrationPage', () => {
  const setup = () => {
    const history = createMemoryHistory();
    render(
      <LoaderProvider>
        <ModalProvider>
          <Router history={history}>
            <NewRegistrationPage />
          </Router>
          <ConfirmationModal />
        </ModalProvider>
      </LoaderProvider>
    );
    return { history };
  };

  const mockShowToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (showToast as jest.Mock).mockImplementation(mockShowToast);
  });

  it('should render NewRegistrationPage correctly', () => {
    setup();

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('CPF')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de admissão')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Cadastrar/i })
    ).toBeInTheDocument();
  });

  it('should show error messages when submitting invalid form', async () => {
    setup();

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText('Nome obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Email obrigatório')).toBeInTheDocument();
      expect(screen.getByText('CPF obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Insira uma data válida')).toBeInTheDocument();
    });
  });

  it('should call RegistrationService.create and show success toast on valid form submission', async () => {
    mockApi.onPost('/registrations').reply(200, {
      id: '1',
      employeeName: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '70932936032',
      admissionDate: '01/01/2021',
      status: 'REVIEW',
    });

    const { history } = setup();

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText('CPF'), {
      target: { value: '70932936032' },
    });
    fireEvent.change(screen.getByLabelText('Data de admissão'), {
      target: { value: '2021-01-01' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(RegistrationService.create).toHaveBeenCalledWith({
        employeeName: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '70932936032',
        admissionDate: '01/01/2021',
        status: 'REVIEW',
      });
      expect(mockShowToast).toHaveBeenCalledWith({
        type: 'success',
        message: 'Item cadastrado com sucesso!',
      });
      expect(history.location.pathname).toBe(routes.dashboard);
    });
  });

  it('should show error toast on failed form submission', async () => {
    (RegistrationService.create as jest.Mock).mockImplementation(() => {
      throw new Error('Erro ao cadastrar o item');
    });

    setup();

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText('CPF'), {
      target: { value: '70932936032' },
    });
    fireEvent.change(screen.getByLabelText('Data de admissão'), {
      target: { value: '2021-01-01' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        type: 'error',
        message: 'Erro ao cadastrar o item. Por favor, tente novamente.',
      });
    });
  });

  it('should navigate to dashboard when clicking back button', () => {
    const { history } = setup();

    fireEvent.click(screen.getByLabelText('back'));

    expect(history.location.pathname).toBe(routes.dashboard);
  });
});
