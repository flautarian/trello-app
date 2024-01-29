import styled, { css } from 'styled-components';

export const Container = styled.div`
`;

export const MenuButton = styled.button`
  border-radius: 5px;
  max-height: 30px;
  transition: background 0.15s ease-in-out, transform 0.1s ease-in-out;
  transform: scale(1);
  :hover {
    background: rgba(0, 0, 0, 0.05);
    transform: scale(0.95);
  }
`;

export const CirclePickerContainer = styled.div<{ color: string, display: boolean }>`
  background: ${({ color }) => color};
  position: absolute;
  padding: 10px;
  box-sizing: border-box;
  right: 0;
  top: 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  
  pointer-events: none;
  opacity: 0;
  z-index: -1;
  transform: translateY(-20px);
  transition: opacity 0.3s, transform 0.3s;

  ${({ display }) =>
    display
      ? css`
          opacity: 1;
          transform: translateY(10px);
          pointer-events: auto;
        `
      : css`
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
        `}
`;
