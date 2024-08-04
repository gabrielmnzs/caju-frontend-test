import { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string;
  $bgColor?: string;
  $isVisible?: boolean;
  $size?: 'large' | 'medium' | 'small';
};

export const Button = ({
  children,
  color = '#000000',
  $bgColor = '#C1C1C1',
  $isVisible = true,
  $size = 'medium',
  ...props
}: ButtonProps) => {
  return (
    <S.Container
      type='button'
      color={color}
      $bgColor={$bgColor}
      $isVisible={$isVisible}
      $size={$size}
      {...props}
    >
      {children}
    </S.Container>
  );
};
