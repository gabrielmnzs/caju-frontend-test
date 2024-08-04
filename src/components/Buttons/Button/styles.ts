import styled, { css } from 'styled-components';

interface ContainerProps {
  color?: string;
  $bgColor?: string;
  $isVisible?: boolean;
  $size: 'large' | 'medium' | 'small';
}

const defaultStyles = css<ContainerProps>`
  display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
  align-items: center;
  outline: none;
  border: none;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.color};
  cursor: pointer;
`;

const largeStyles = css<ContainerProps>`
  ${defaultStyles};

  border-radius: 36px;
  padding: 8px 32px;
  height: 56px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;
`;

const mediumStyles = css<ContainerProps>`
  ${defaultStyles};

  border-radius: 24px;
  padding: 6px 24px;
  height: 40px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 14px;
  font-weight: 600;
`;

const smallStyles = css<ContainerProps>`
  ${defaultStyles};

  border-radius: 4px;
  font-size: 12px;
  padding: 4px 16px;
  font-weight: 400;
`;

export const Container = styled.button<ContainerProps>`
  ${(props) => {
    switch (props.$size) {
      case 'large':
        return largeStyles;
      case 'small':
        return smallStyles;
      default:
        return mediumStyles;
    }
  }}
`;
