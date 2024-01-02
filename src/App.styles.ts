import styled, { keyframes } from 'styled-components';

const bounceAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`;

export const Container = styled.div<{ bgColor: string }>`
  height: 100%;
  flex-direction: column;
  overflow-x: scroll;
  background-color: ${({ bgColor }) => bgColor};
  font-family: sans-serif;
`;

export const BoardContainer = styled.div<{ bgColor: string }>`
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${({ bgColor }) => bgColor};
  font-family: sans-serif;
`;

export const Lists = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 40px;
`;

export const NewListButton = styled.button`
  min-width: 250px;
  min-height: 300px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 5px;
  height: 30px;
  transition: background-color 0.25s ease, transform 0.2s ease-in-out;
  cursor: pointer;
  
  &:hover {
    transform: scale(0.95);
    background-color: rgba(255, 255, 255, 0.6);
  }

  &:active {
    transform: scale(1);
  }
`;
