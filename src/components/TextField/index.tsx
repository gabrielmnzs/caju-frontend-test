import { InputHTMLAttributes, forwardRef } from 'react';

import * as S from './styles';

type TextFieldProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  TextFieldProps
> = ({ label, error, ...props }: TextFieldProps, ref) => {
  return (
    <S.Container>
      {label && (
        <label htmlFor={props.id} style={{ marginBottom: '8px' }}>
          {label}
        </label>
      )}
      <S.Input ref={ref} {...props} />
      {error && (
        <span style={{ fontSize: 12, color: 'red', height: '15px' }}>
          {error}
        </span>
      )}
    </S.Container>
  );
};

export default forwardRef(TextField);
