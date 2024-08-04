import { render, screen } from '@testing-library/react';
import { Toast } from '.';

jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid='toast-container' />,
}));

describe('Toast component', () => {
  it('should render the ToastContainer correctly', () => {
    render(<Toast />);

    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
  });
});
