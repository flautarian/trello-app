import styled from 'styled-components';

export const Container = styled.div`
  min-width: 250px;
  padding: 5px;
  box-sizing: border-box;
  margin-left: 5px;
  border-radius: 5px;
  background: white;
  background: rgb(235, 236, 240);
  width: 250px;
  min-height: 100px;
`;

export const Header = styled.header<{ isDragging: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  align-items: center;
  transition: background-color 0.1s ease-in-out;
  background-color: ${({ isDragging }) => isDragging ? localStorage.getItem('bgColor') : "rgb(200, 200, 200)"};
  padding-bottom: 10px;
`;
export const Title = styled.div``;

export const CloseButton = styled.button``;
export const AddCardButton = styled.button`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  background-color: rgb(200, 200, 200);
  transition: background-color 0.3s ease, transform 0.15s ease-in-out;
  cursor: pointer;
  
  &:hover {
    background-color: #1CFF59;
  }

  &:active {
      background-color: #20DF53;
      transform: scale(0.9);
  }
`;
export const DragContainer = styled.div``;
