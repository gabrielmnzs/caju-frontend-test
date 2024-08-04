import styled from 'styled-components';

import { Container as IconButtonContainer } from '~/components/Buttons/IconButton/styles';
import { Container as ButtonContainer } from '~/components/Buttons/Button/styles';
import { Container as TextFieldContainer } from '~/components/TextField/styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 64px);
`;

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px solid #f0f0f0;
  width: 500px;
  padding: 48px;
  gap: 16px;
  border-radius: 8px;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    ${TextFieldContainer} {
      margin-bottom: 10px;
    }

    ${ButtonContainer} {
      align-self: flex-end;
      margin-top: 10px;
    }
  }

  ${IconButtonContainer} {
    margin-bottom: 10px;
    align-self: flex-start;
  }
`;
