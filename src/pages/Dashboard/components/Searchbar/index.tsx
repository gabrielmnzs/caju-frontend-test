import { useState, forwardRef, useImperativeHandle } from 'react';

import { cpf } from '~/utils/formatters/cpf';

import TextField from '~/components/TextField';
import * as S from './styles';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export const SearchBar = forwardRef(({ onSearch }: SearchBarProps, ref) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleSearchKeyUp = () => {
    onSearch(searchValue);
  };

  useImperativeHandle(ref, () => ({
    clearSearch() {
      setSearchValue('');
    },
  }));

  return (
    <S.Container>
      <TextField
        placeholder='Digite um CPF válido'
        value={searchValue ? cpf(searchValue) : ''}
        maxLength={14}
        onChange={handleSearchChange}
        onKeyUp={handleSearchKeyUp}
      />
    </S.Container>
  );
});

SearchBar.displayName = 'SearchBar';
