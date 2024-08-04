import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as RegistrationService from '~/services/registrations';
import { Registration } from '~/types';
import { useLoader } from '~/hooks/loader';
import { useModal } from '~/hooks/modal';
import { showToast } from '~/hooks/toast';
import { Action, Status } from '~/constants';
import { RegistrationCard } from '.';

jest.mock('~/services/registrations');
jest.mock('~/hooks/loader');
jest.mock('~/hooks/modal');
jest.mock('~/hooks/toast');

const mockSetLoading = jest.fn();
const mockOpenModal = jest.fn();
const mockShowToast = jest.fn();

(useLoader as jest.Mock).mockReturnValue({ setLoading: mockSetLoading });
(useModal as jest.Mock).mockReturnValue({ openModal: mockOpenModal });
(showToast as jest.Mock).mockImplementation(mockShowToast);

const mockRegistration: Registration = {
  id: '1',
  employeeName: 'John Doe',
  email: 'john.doe@example.com',
  admissionDate: '2021-01-01',
  cpf: '70932936032',
  status: 'REVIEW',
};

const mockOnUpdate = jest.fn();

describe('RegistrationCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the RegistrationCard with correct data', () => {
    render(
      <RegistrationCard data={mockRegistration} onUpdate={mockOnUpdate} />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('2021-01-01')).toBeInTheDocument();
    expect(screen.getByText('Reprovar')).toBeInTheDocument();
    expect(screen.getByText('Aprovar')).toBeInTheDocument();
  });

  it('should call handleStatusChange and update status to APPROVED', async () => {
    (RegistrationService.put as jest.Mock).mockResolvedValue({
      ...mockRegistration,
      status: Status.APPROVED,
    });

    render(
      <RegistrationCard data={mockRegistration} onUpdate={mockOnUpdate} />
    );

    fireEvent.click(screen.getByText('Aprovar'));

    await waitFor(() => {
      expect(mockOpenModal).toHaveBeenCalledWith(
        Action.APPROVED,
        expect.any(Function)
      );
    });

    const confirmAction = mockOpenModal.mock.calls[0][1];
    confirmAction();

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(RegistrationService.put).toHaveBeenCalledWith({
        ...mockRegistration,
        status: Status.APPROVED,
      });
      expect(mockOnUpdate).toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith({
        type: 'success',
        message: 'Status do item atualizado com sucesso!',
      });
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  it('should call handleStatusChange and update status to REPROVED', async () => {
    (RegistrationService.put as jest.Mock).mockResolvedValue({
      ...mockRegistration,
      status: Status.REPROVED,
    });

    render(
      <RegistrationCard data={mockRegistration} onUpdate={mockOnUpdate} />
    );

    fireEvent.click(screen.getByText('Reprovar'));

    await waitFor(() => {
      expect(mockOpenModal).toHaveBeenCalledWith(
        Action.REPROVED,
        expect.any(Function)
      );
    });

    const confirmAction = mockOpenModal.mock.calls[0][1];
    confirmAction();

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(RegistrationService.put).toHaveBeenCalledWith({
        ...mockRegistration,
        status: Status.REPROVED,
      });
      expect(mockOnUpdate).toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith({
        type: 'success',
        message: 'Status do item atualizado com sucesso!',
      });
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  it('should call handleRemoveRegistration and remove the item', async () => {
    (RegistrationService.remove as jest.Mock).mockResolvedValue({});

    render(
      <RegistrationCard data={mockRegistration} onUpdate={mockOnUpdate} />
    );

    fireEvent.click(screen.getByRole('button', { name: /delete-button/i }));

    await waitFor(() => {
      expect(mockOpenModal).toHaveBeenCalledWith(
        Action.DELETE,
        expect.any(Function)
      );
    });

    const confirmAction = mockOpenModal.mock.calls[0][1];
    confirmAction();

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(RegistrationService.remove).toHaveBeenCalledWith(mockRegistration);
      expect(mockOnUpdate).toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith({
        type: 'success',
        message: 'Item removido com sucesso!',
      });
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });
});
