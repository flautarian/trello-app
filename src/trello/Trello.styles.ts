import styled from 'styled-components';
import { animations } from '../utils/components/globalAnimationsComponent/globalAnimationsComponent';

export const Container = styled.div<{ $bgcolor: string }>`
  height: 100%;
  flex-direction: column;
  background-color: ${({ $bgcolor }) => $bgcolor};
  font-family: poppins, sans-serif;
`;

export const BoardContainer = styled.div<{ $bgcolor: string }>`
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${({ $bgcolor }) => $bgcolor};
  font-family: poppins, sans-serif;
  max-width: 100vw;
  overflow: auto;
`;

export const Lists = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5vh;
  height: 90vh;
`;

export const NewListButton = styled.button<{$xorigin?: string, $yorigin?: string, $xtarget?: string, $ytarget?: string}>`
  min-width: 250px;
  max-height: 250px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 5px;
  transition: background-color 0.25s ease, transform 0.2s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  font-family: Poppins, sans-serif;
  
  &:hover {
    transform: scale(0.95);
    background-color: rgba(255, 255, 255, 0.6);
  }

  &:active {
    transform: scale(1);
  }
  
  animation: ${({}) => animations["appear"].keyframes} ${({}) => animations["appear"].duration} ${({}) => animations["appear"].type};
`;
