import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HiRefresh } from 'react-icons/hi';

import routes from '~/router/routes';
import * as RegistrationService from '~/services/registrations';
import { removeSpecialChars } from '~/utils/formatters';
import { isValidCPF } from '~/utils/validations';
import { useLoader } from '~/hooks/loader';

import { Registration } from '~/types';
import { Columns, SearchBar } from './components';
import { Button, IconButton } from '~/components/Buttons';

import * as S from './styles';

const DashboardPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] =
    useState<Registration[]>(registrations);
  const { setLoading } = useLoader();
  const searchBarRef = useRef<{ clearSearch: () => void }>(null);
  const history = useHistory();

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);

      const data = await RegistrationService.get();
      setRegistrations(data);
      setFilteredRegistrations(data);

      if (searchBarRef.current) {
        searchBarRef.current.clearSearch();
      }
    } catch (error) {
      console.error('Erro ao buscar registros. ', error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setRegistrations, setFilteredRegistrations]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleSearch = async (searchValue: string) => {
    if (isValidCPF(searchValue)) {
      setLoading(true);
      const cpf = removeSpecialChars(searchValue);
      const data = await RegistrationService.getByCPF(cpf);
      setFilteredRegistrations(data);
    } else {
      setFilteredRegistrations(registrations);
    }
    setLoading(false);
  };

  const goToNewRegistrationPage = () => {
    history.push(routes.newRegistration);
  };

  return (
    <S.Container>
      <S.Menu>
        <SearchBar ref={searchBarRef} onSearch={handleSearch} />
        <S.Actions>
          <IconButton
            $hasBorder={true}
            color='#64a98c'
            aria-label='refetch'
            onClick={fetchRegistrations}
          >
            <HiRefresh />
          </IconButton>
          <Button
            color='#FFFFFF'
            $size='large'
            $bgColor='#64a98c'
            onClick={() => goToNewRegistrationPage()}
          >
            Nova Admissão
          </Button>
        </S.Actions>
      </S.Menu>
      <Columns
        registrations={filteredRegistrations}
        onUpdate={fetchRegistrations}
      />
    </S.Container>
  );
};
export default DashboardPage;
