import { render } from '@testing-library/react';

import { Header } from '.';

describe('Header Component', () => {
  it('should render the logo', () => {
    const { getByAltText } = render(<Header />);
    const logoElement = getByAltText('Logo');

    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', 'test-file-stub');
  });

  it('should have correct styles applied', () => {
    const { getByRole, getByAltText } = render(<Header />);
    const containerElement = getByRole('banner');
    const logoElement = getByAltText('Logo');

    expect(containerElement).toHaveStyleRule('width', '100%');
    expect(containerElement).toHaveStyleRule('height', '64px');
    expect(containerElement).toHaveStyleRule('position', 'fixed');
    expect(containerElement).toHaveStyleRule('top', '0');
    expect(containerElement).toHaveStyleRule('display', 'flex');
    expect(containerElement).toHaveStyleRule('align-items', 'center');
    expect(containerElement).toHaveStyleRule('padding', '0px 24px');
    expect(logoElement).toHaveStyleRule('height', '50px');
  });
});
