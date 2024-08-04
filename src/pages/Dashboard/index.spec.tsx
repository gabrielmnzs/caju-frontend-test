import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import DashboardPage from '~/pages/Dashboard';
import * as RegistrationService from '~/services/registrations';
import { LoaderProvider } from '~/hooks/loader';
import { ModalProvider } from '~/hooks/modal';
import ConfirmationModal from '~/components/ModalConfirmation';

jest.mock('~/services/registrations');

const mockRegistrations = [
  {
    id: '1',
    employeeName: 'John Doe',
    email: 'john.doe@example.com',
    admissionDate: '2021-01-01',
    cpf: '70932936032',
    status: 'REVIEW',
  },
  {
    id: '2',
    employeeName: 'Jane Smith',
    email: 'jane.smith@example.com',
    admissionDate: '2021-02-01',
    cpf: '44764335026',
    status: 'APPROVED',
  },
];

describe('DashboardPage', () => {
  const setup = () => {
    const history = createMemoryHistory();
    render(
      <LoaderProvider>
        <ModalProvider>
          <Router history={history}>
            <DashboardPage />
          </Router>
          <ConfirmationModal />
        </ModalProvider>
      </LoaderProvider>
    );
    return { history };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the dashboard page with initial data', async () => {
    (RegistrationService.get as jest.Mock).mockResolvedValue(mockRegistrations);

    setup();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('should search for a registration by CPF', async () => {
    (RegistrationService.get as jest.Mock).mockResolvedValue(mockRegistrations);
    (RegistrationService.getByCPF as jest.Mock).mockResolvedValue([
      mockRegistrations[0],
    ]);

    setup();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Digite um CPF válido'), {
      target: { value: '70932936032' },
    });
    fireEvent.keyUp(screen.getByPlaceholderText('Digite um CPF válido'));

    await waitFor(() => {
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('should refresh the registration list', async () => {
    (RegistrationService.get as jest.Mock).mockResolvedValue(mockRegistrations);

    setup();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('refetch'));

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('should approve a registration and move to the approved column', async () => {
    (RegistrationService.get as jest.Mock).mockResolvedValue(mockRegistrations);
    (RegistrationService.put as jest.Mock).mockResolvedValue({
      ...mockRegistrations[0],
      status: 'APPROVED',
    });

    setup();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const reviewColumn = screen.getByText('Pronto para revisar').closest('div');
    within(reviewColumn!).getByText('John Doe');
    fireEvent.click(within(reviewColumn!).getByText('Aprovar'));

    await waitFor(() => {
      expect(screen.getByText('Confirmar ação')).toBeInTheDocument();
      expect(
        screen.getByText('Você tem certeza que deseja aprovar este item?')
      ).toBeInTheDocument();
    });

    (RegistrationService.get as jest.Mock).mockResolvedValue([
      {
        id: '1',
        employeeName: 'John Doe',
        email: 'john.doe@example.com',
        admissionDate: '2021-01-01',
        status: 'APPROVED',
      },
      {
        id: '2',
        employeeName: 'Jane Smith',
        email: 'jane.smith@example.com',
        admissionDate: '2021-02-01',
        status: 'APPROVED',
      },
    ]);

    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        within(reviewColumn!).queryByText('John Doe')
      ).not.toBeInTheDocument();

      const approvedColumn = screen.getByText('Aprovado').closest('div');
      expect(approvedColumn).toContainElement(screen.getByText('John Doe'));
    });
  });

  it('should reject a registration and move to the rejected column', async () => {
    (RegistrationService.get as jest.Mock).mockResolvedValue(mockRegistrations);
    (RegistrationService.put as jest.Mock).mockResolvedValue({
      ...mockRegistrations[0],
      status: 'REPROVED',
    });

    setup();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const reviewColumn = screen.getByText('Pronto para revisar').closest('div');
    const card = within(reviewColumn!)
      .getByText('John Doe')
      .closest('[data-testid="registration-card"]') as HTMLElement;
    fireEvent.click(within(card).getByText('Reprovar'));

    await waitFor(() => {
      expect(screen.getByText('Confirmar ação')).toBeInTheDocument();
      expect(
        screen.getByText('Você tem certeza que deseja reprovar este item?')
      ).toBeInTheDocument();
    });

    (RegistrationService.get as jest.Mock).mockResolvedValue([
      {
        id: '1',
        employeeName: 'John Doe',
        email: 'john.doe@example.com',
        admissionDate: '2021-01-01',
        status: 'REPROVED',
      },
      {
        id: '2',
        employeeName: 'Jane Smith',
        email: 'jane.smith@example.com',
        admissionDate: '2021-02-01',
        status: 'APPROVED',
      },
    ]);

    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        within(reviewColumn!).queryByText('John Doe')
      ).not.toBeInTheDocument();

      const rejectedColumn = screen.getByText('Reprovado').closest('div');
      expect(rejectedColumn).toContainElement(screen.getByText('John Doe'));
    });
  });

  it('should navigate to new registration page', async () => {
    (RegistrationService.get as jest.Mock).mockResolvedValue(mockRegistrations);

    const { history } = setup();

    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Nova Admissão'));

    expect(history.location.pathname).toBe('/new-registration');
  });
});
