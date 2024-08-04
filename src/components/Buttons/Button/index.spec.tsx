import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Button } from '.';

describe('Button Component', () => {
  it('should render the button with default props', () => {
    const { getByRole } = render(<Button>Click Me</Button>);
    const buttonElement = getByRole('button', { name: /click me/i });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyleRule('display', 'flex');
    expect(buttonElement).toHaveStyleRule('background-color', '#C1C1C1');
    expect(buttonElement).toHaveStyleRule('color', '#000000');
    expect(buttonElement).toHaveStyleRule('height', '40px');
  });

  it('should render the button with large size', () => {
    const { getByRole } = render(<Button $size='large'>Click Me</Button>);
    const buttonElement = getByRole('button', { name: /click me/i });

    expect(buttonElement).toHaveStyleRule('height', '56px');
    expect(buttonElement).toHaveStyleRule('padding', '8px 32px');
  });

  it('should render the button with small size', () => {
    const { getByRole } = render(<Button $size='small'>Click Me</Button>);
    const buttonElement = getByRole('button', { name: /click me/i });

    expect(buttonElement).toHaveStyleRule('height', '22px');
    expect(buttonElement).toHaveStyleRule('padding', '4px 16px');
    expect(buttonElement).toHaveStyleRule('font-size', '12px');
  });

  it('should render the button with custom color and background color', () => {
    const { getByRole } = render(
      <Button color='#ffffff' $bgColor='#ff0000'>
        Click Me
      </Button>
    );
    const buttonElement = getByRole('button', { name: /click me/i });

    expect(buttonElement).toHaveStyleRule('color', '#ffffff');
    expect(buttonElement).toHaveStyleRule('background-color', '#ff0000');
  });

  it('should render the button as hidden', () => {
    const { getByRole } = render(<Button $isVisible={false}>Click Me</Button>);
    const buttonElement = getByRole('button', {
      hidden: true,
    });

    expect(buttonElement).toHaveStyleRule('display', 'none');
  });
});
