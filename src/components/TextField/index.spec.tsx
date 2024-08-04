import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import TextField from './index';

describe('TextField Component', () => {
  it('should render the input with label', () => {
    const { getByLabelText } = render(
      <TextField label='Username' id='username' />
    );

    expect(getByLabelText('Username')).toBeInTheDocument();
  });

  it('should render the input with error message', () => {
    const { getByText } = render(<TextField error='Invalid input' />);

    expect(getByText('Invalid input')).toBeInTheDocument();
  });

  it('should call onChange handler', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <TextField label='Username' id='username' onChange={handleChange} />
    );
    const input = getByLabelText('Username');

    fireEvent.change(input, { target: { value: 'JohnDoe' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('JohnDoe');
  });

  it('should render with default styles', () => {
    const { getByRole } = render(<TextField />);
    const input = getByRole('textbox');

    expect(input).toHaveStyleRule('padding', '0 8px');
    expect(input).toHaveStyleRule('border-radius', '8px');
    expect(input).toHaveStyleRule('min-height', '36px');
    expect(input).toHaveStyleRule('background-color', '#ffffff');
  });

  it('should render with focus styles', () => {
    const { getByRole } = render(<TextField />);
    const input = getByRole('textbox');

    input.focus();

    expect(input).toHaveFocus();
    expect(input).toHaveStyleRule('border', '1px solid #007c89', {
      modifier: ':focus',
    });
    expect(input).toHaveStyleRule('box-shadow', 'inset 0 0 0 1px #007c89', {
      modifier: ':focus',
    });
  });
});
