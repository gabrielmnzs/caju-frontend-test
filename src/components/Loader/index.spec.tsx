import { render } from '@testing-library/react';

import { Loader } from '../../components/Loader';

describe('Loader Component', () => {
  it('should render the loader', () => {
    const { getByTestId } = render(<Loader />);
    const loaderElement = getByTestId('loader-container');

    expect(loaderElement).toBeInTheDocument();
  });

  it('should have correct styles applied to the container', () => {
    const { getByTestId } = render(<Loader />);
    const containerElement = getByTestId('loader-container');

    expect(containerElement).toHaveStyleRule('display', 'flex');
    expect(containerElement).toHaveStyleRule('justify-content', 'center');
    expect(containerElement).toHaveStyleRule('align-items', 'center');
    expect(containerElement).toHaveStyleRule('position', 'absolute');
    expect(containerElement).toHaveStyleRule('width', '100%');
    expect(containerElement).toHaveStyleRule('height', '100vh');
    expect(containerElement).toHaveStyleRule('left', '0');
    expect(containerElement).toHaveStyleRule('top', '0');
    expect(containerElement).toHaveStyleRule('z-index', '1000');
    expect(containerElement).toHaveStyleRule(
      'background',
      'rgba(0, 0, 0, 0.32)'
    );
  });
});
