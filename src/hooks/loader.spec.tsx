import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { LoaderProvider, useLoader } from './loader';

const TestComponent = () => {
  const { isLoading, setLoading } = useLoader();

  return (
    <div>
      <button onClick={() => setLoading(true)}>Show Loader</button>
      <button onClick={() => setLoading(false)}>Hide Loader</button>
      <p>{`Loading: ${isLoading}`}</p>
    </div>
  );
};

describe('useLoader Hook', () => {
  it('should render without crashing', () => {
    render(
      <LoaderProvider>
        <TestComponent />
      </LoaderProvider>
    );
  });

  it('should show the loader when setLoading(true) is called', async () => {
    render(
      <LoaderProvider>
        <TestComponent />
      </LoaderProvider>
    );

    fireEvent.click(screen.getByText('Show Loader'));

    await waitFor(() => {
      expect(screen.getByTestId('loader-container')).toBeInTheDocument();
      expect(screen.getByText('Loading: true')).toBeInTheDocument();
    });
  });

  it('should hide the loader when setLoading(false) is called', async () => {
    render(
      <LoaderProvider>
        <TestComponent />
      </LoaderProvider>
    );

    fireEvent.click(screen.getByText('Show Loader'));

    await waitFor(() => {
      expect(screen.getByTestId('loader-container')).toBeInTheDocument();
      expect(screen.getByText('Loading: true')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Hide Loader'));

    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
      expect(screen.getByText('Loading: false')).toBeInTheDocument();
    });
  });

  it('should throw an error if useLoader is used outside of LoaderProvider', () => {
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => render(<TestComponent />)).toThrow(
      'useLoader must be used within a LoaderProvider'
    );

    console.error = originalError;
  });
});
