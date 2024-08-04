import React, { act } from 'react';
import { render, fireEvent } from '@testing-library/react';

import * as cpfFormatter from '~/utils/formatters/cpf';
import { SearchBar } from './index';

jest.mock('~/utils/formatters/cpf', () => ({
  cpf: jest.fn((value) => value),
}));

const mockOnSearch = jest.fn();

describe('SearchBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the search bar with correct placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={mockOnSearch} />
    );

    expect(getByPlaceholderText('Digite um CPF válido')).toBeInTheDocument();
  });

  it('should call onSearch when key up event is triggered', () => {
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={mockOnSearch} />
    );
    const input = getByPlaceholderText('Digite um CPF válido');

    fireEvent.change(input, { target: { value: '12345678900' } });
    fireEvent.keyUp(input);

    expect(mockOnSearch).toHaveBeenCalledWith('12345678900');
  });

  it('should format the CPF value correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={mockOnSearch} />
    );
    const input = getByPlaceholderText('Digite um CPF válido');

    fireEvent.change(input, { target: { value: '12345678900' } });

    expect(input).toHaveValue('12345678900');
    expect(cpfFormatter.cpf).toHaveBeenCalledWith('12345678900');
  });

  it('should clear the search value when clearSearch is called', () => {
    const ref = React.createRef<{ clearSearch: () => void }>();
    const { getByPlaceholderText } = render(
      <SearchBar ref={ref} onSearch={mockOnSearch} />
    );
    const input = getByPlaceholderText('Digite um CPF válido');

    fireEvent.change(input, { target: { value: '12345678900' } });

    expect(input).toHaveValue('12345678900');
    act(() => {
      ref.current?.clearSearch();
    });
    expect(input).toHaveValue('');
  });

  it('should have correct styles applied', () => {
    const { container } = render(<SearchBar onSearch={mockOnSearch} />);
    const searchBarContainer = container.firstChild;

    expect(searchBarContainer).toHaveStyleRule('display', 'flex');
    expect(searchBarContainer).toHaveStyleRule(
      'justify-content',
      'space-between'
    );
    expect(searchBarContainer).toHaveStyleRule('align-items', 'center');
    expect(searchBarContainer).toHaveStyleRule('width', '200px');
  });
});
