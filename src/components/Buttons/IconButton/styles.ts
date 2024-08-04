import styled from 'styled-components';

interface ContainerProps {
  color?: string;
  $hasBorder?: boolean;
  $size?: string;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  padding: 4px;
  border-radius: 24px;
  border: ${(props) =>
    props.$hasBorder ? `2px solid ${props.color}` : 'none'};
  background-color: transparent;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
    color: ${(props) => props.color};
  }
`;
