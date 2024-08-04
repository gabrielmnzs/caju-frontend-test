import { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  $hasBorder?: boolean;
};

export const IconButton = ({ children, ...props }: IconButtonProps) => {
  return (
    <S.Container type='button' {...props}>
      {children}
    </S.Container>
  );
};
