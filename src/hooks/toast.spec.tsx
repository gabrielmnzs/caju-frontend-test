import { toast } from 'react-toastify';

import { showToast } from './toast';

jest.mock('react-toastify');

describe('showToast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call toast.success with the correct message for success type', () => {
    const message = 'Operation was successful';

    showToast({ type: 'success', message });

    expect(toast.success).toHaveBeenCalledWith(message);
  });

  it('should call toast.error with the correct message for error type', () => {
    const message = 'There was an error';

    showToast({ type: 'error', message });

    expect(toast.error).toHaveBeenCalledWith(message);
  });

  it('should call toast.info with the correct message for default type', () => {
    const message = 'This is an info message';

    showToast({ type: 'info', message });

    expect(toast.info).toHaveBeenCalledWith(message);
  });

  it('should call toast.info with the correct message for an unknown type', () => {
    const message = 'Unknown type';

    showToast({ type: 'unknown', message });

    expect(toast.info).toHaveBeenCalledWith(message);
  });
});
