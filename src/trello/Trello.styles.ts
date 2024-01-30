import styled from 'styled-components';
import { animations } from '../utils/components/globalAnimationsComponent/globalAnimationsComponent';

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
  background: rgba(255, 255, 255, 0.2);
  margin: 0 5px;
  transition: background-color 0.25s ease, transform 0.2s ease-in-out;
  cursor: pointer;
  
  &:hover {
    transform: scale(0.95);
    background-color: rgba(255, 255, 255, 0.6);
  }

  &:active {
    transform: scale(1);
  }
  
  animation: ${({}) => animations["listappear"].keyframes} ${({}) => animations["listappear"].duration} ${({}) => animations["listappear"].type};
`;
