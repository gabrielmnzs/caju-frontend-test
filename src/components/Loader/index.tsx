import { RotatingLines } from 'react-loader-spinner';

import * as S from './styles';

export const Loader = () => {
  return (
    <S.Container data-testid='loader-container'>
      <RotatingLines
        strokeColor='	#808080'
        strokeWidth='5'
        animationDuration='0.75'
        width='46'
        visible={true}
      />
    </S.Container>
  );
};
