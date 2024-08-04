import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import ConfirmationModal from './index';
import { useModal } from '../../hooks/modal';

jest.mock('../../hooks/modal');

describe('ConfirmationModal Component', () => {
  const mockCloseModal = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    (useModal as jest.Mock).mockReturnValue({
      showModal: true,
      message: 'Are you sure?',
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
      closeModal: mockCloseModal,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal with message', () => {
    const { getByText, getByRole } = render(<ConfirmationModal />);

    expect(getByText('Are you sure?')).toBeInTheDocument();
    expect(getByRole('button', { name: /confirmar/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('should call onConfirm and closeModal when Confirmar button is clicked', () => {
    const { getByRole } = render(<ConfirmationModal />);
    const confirmButton = getByRole('button', { name: /confirmar/i });

    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when Cancelar button is clicked', () => {
    const { getByRole } = render(<ConfirmationModal />);
    const cancelButton = getByRole('button', { name: /cancelar/i });

    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should not render the modal when showModal is false', () => {
    (useModal as jest.Mock).mockReturnValue({
      showModal: false,
      message: '',
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
      closeModal: jest.fn(),
    });
    const { queryByText } = render(<ConfirmationModal />);

    expect(queryByText('Are you sure?')).not.toBeInTheDocument();
  });
});
