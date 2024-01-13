import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: fixed;
  right: 20px;
`;

export const MenuButton = styled.button`
  border-radius: 20px;
  transition: background 0.15s ease-in-out, transform 0.1s ease-in-out;
  transform: scale(1);
  :hover {
    background: rgba(0, 0, 0, 0.05);
    transform: scale(0.95);
  }
`;

export const CirclePickerContainer = styled.div`
  background: white;
  position: absolute;
  padding: 10px;
  box-sizing: border-box;
  right: 0;
  top: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
`;
