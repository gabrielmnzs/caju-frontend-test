import { HiRefresh } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import TextField from '~/components/TextField';
import routes from '~/router/routes';
import * as S from './styles';
import { useState } from 'react';
export const SearchBar = ({ onSearch }: any) => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleSearchKeyUp = () => {
    onSearch(searchValue);
  };

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <TextField
        placeholder='Digite um CPF válido'
        value={searchValue}
        onChange={handleSearchChange}
        onKeyUp={handleSearchKeyUp}
      />
      <S.Actions>
        <IconButton aria-label='refetch'>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
