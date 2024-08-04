import styled from 'styled-components';

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.32);
`;

export const Container = styled.div`
  width: 400px;
  height: 200px;
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  padding-top: 10px;
  padding-bottom: 10px;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }
`;

export const Body = styled.div`
  flex-grow: 1;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 20px;
  padding-bottom: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
