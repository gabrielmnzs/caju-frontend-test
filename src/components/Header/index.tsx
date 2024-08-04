import * as S from './styles';

import logo from '../../assets/logo-caju.png';

export const Header = () => {
  return (
    <S.Container role='banner'>
      <S.Logo src={logo} alt='Logo' />
    </S.Container>
  );
};
