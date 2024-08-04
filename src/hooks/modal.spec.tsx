import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { ModalProvider, useModal } from './modal';
import * as generateModalMessage from '~/utils/generators/generate-modal-message';

jest.mock('~/utils/generators/generate-modal-message');

const TestComponent = () => {
  const { showModal, message, onConfirm, onCancel, openModal } = useModal();

  return (
    <div>
      {showModal && (
        <div data-testid='modal'>
          <p>{message}</p>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      )}
      <button
        onClick={() => openModal('test-action', () => console.log('Confirmed'))}
      >
        Open Modal
      </button>
    </div>
  );
};

describe('useModal Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (generateModalMessage.generateModalMessage as jest.Mock).mockReturnValue(
      'Mocked modal message'
    );
  });

  it('should render without crashing', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );
  });

  it('should open the modal with the correct message', async () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    fireEvent.click(screen.getByText('Open Modal'));

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByText('Mocked modal message')).toBeInTheDocument();
    });
  });

  it('should call the onConfirm function when confirm button is clicked', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    fireEvent.click(screen.getByText('Open Modal'));

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Confirmed');
    });
  });

  it('should close the modal when cancel button is clicked', async () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    fireEvent.click(screen.getByText('Open Modal'));

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  it('should throw an error if useModal is used outside of ModalProvider', () => {
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => render(<TestComponent />)).toThrow(
      'useModal must be used within a ModalProvider'
    );

    console.error = originalError;
  });
});
