import { render } from '@testing-library/react';
import 'jest-styled-components';

import { IconButton } from './index';

describe('IconButton Component', () => {
  it('should render the button with default props', () => {
    const { getByRole } = render(<IconButton>Icon</IconButton>);
    const buttonElement = getByRole('button', { name: /icon/i });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyleRule('display', 'flex');
    expect(buttonElement).toHaveStyleRule('align-items', 'center');
    expect(buttonElement).toHaveStyleRule('justify-content', 'center');
    expect(buttonElement).toHaveStyleRule('width', 'fit-content');
    expect(buttonElement).toHaveStyleRule('padding', '4px');
    expect(buttonElement).toHaveStyleRule('border-radius', '24px');
    expect(buttonElement).toHaveStyleRule('background-color', 'transparent');
    expect(buttonElement).toHaveStyleRule('cursor', 'pointer');
  });

  it('should render the button with border', () => {
    const { getByRole } = render(
      <IconButton $hasBorder={true} color='#ff0000'>
        Icon
      </IconButton>
    );
    const buttonElement = getByRole('button', { name: /icon/i });

    expect(buttonElement).toHaveStyleRule('border', '2px solid #ff0000');
  });

  it('should render the button without border', () => {
    const { getByRole } = render(
      <IconButton $hasBorder={false}>Icon</IconButton>
    );
    const buttonElement = getByRole('button', { name: /icon/i });

    expect(buttonElement).toHaveStyleRule('border', 'none');
  });

  it('should render the button with custom color', () => {
    const { getByRole } = render(<IconButton color='#00ff00'>Icon</IconButton>);
    const buttonElement = getByRole('button', { name: /icon/i });

    expect(buttonElement).toHaveStyleRule('color', '#00ff00', {
      modifier: 'svg',
    });
  });
});
