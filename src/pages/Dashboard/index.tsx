import { useEffect, useState } from 'react';

import * as RegistrationService from '~/services/registrations';
import { Registration } from '~/types';

import Collumns from './components/Columns';
import { SearchBar } from './components/Searchbar';
import * as S from './styles';

const DashboardPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] =
    useState<Registration[]>(registrations);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const data = await RegistrationService.get();
      setRegistrations(data);
      setFilteredRegistrations(data);
    };
    fetchRegistrations();
  }, []);

  const handleSearch = (searchValue: string) => {
    if (searchValue) {
      const filtered = registrations.filter((registration) =>
        registration.cpf.includes(searchValue)
      );
      setFilteredRegistrations(filtered);
    } else {
      setFilteredRegistrations(registrations);
    }
  };

  return (
    <S.Container>
      <SearchBar onSearch={handleSearch} />
      <Collumns registrations={filteredRegistrations ?? registrations} />
    </S.Container>
  );
};
export default DashboardPage;
