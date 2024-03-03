import styled from 'styled-components';
import { AnimationName, animations } from '../../../utils/components/globalAnimationsComponent/globalAnimationsComponent'

export const Container = styled.div<{ $isdragging: number, $colorl: string, $animation: AnimationName, $xorigin?: string, $yorigin?: string, $xtarget?: string, $ytarget?: string }>`
  width: 250px;
  min-width: 250px;
  min-height: 100px;
  height: max-content;
  padding: 5px;
  box-sizing: border-box;
  margin-left: 5px;
  border-radius: 5px;
  background: white;
  transition: background-color 0.1s ease-out;
  background-color: ${({ $isdragging, $colorl }) => $isdragging ? $colorl : "rgb(200, 200, 200)"};
  font-family: "Poppins", sans-serif;
  animation: ${(props) => animations[props.$animation].keyframes} ${({ $animation }) => animations[$animation].duration} ${({ $animation }) => animations[$animation].type};
`;

export const Header = styled.header<{ $isdragging: number, $colord: string }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 5px;
  width: 100%;
  margin-left: -5px;
  margin-top: -5px;
  align-items: center;
  transition: background-color 0.1s ease-out;
  background-color: ${({ $isdragging, $colord }) => $isdragging ? $colord : "rgb(200, 200, 200)"};
  padding-bottom: 10px;
`;

export const Title = styled.div``;

export const CloseButton = styled.button`
border-radius: 25px;
max-width: 35px;
transition: background-color 0.1s ease-in-out;
background-color: rgb(200, 200, 200);

&:hover{
  background-color: rgb(255, 100, 100);
}
`;

export const CardContainer = styled.div<{ $bghovercolor: string, $bgcolor: string }>`

transition: background-color 0.15s ease-in-out, transform 0.1s ease-in-out;
cursor: pointer;

&:hover {
    background-color: ${({ $bghovercolor }) => $bghovercolor};
    transform: scale(0.95);
}

&:active {
    background-color: ${({ $bgcolor }) => $bgcolor};
    transform: scale(0.9);
}
`

export const AddCardButton = styled.button`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(200, 200, 200);
  transition: background-color 0.3s ease, transform 0.15s ease-in-out;
  cursor: pointer;
  font-family: Poppins, sans-serif;
  
  &:hover {
    background-color: #1CFF59;
  }
        
  &:active {
      background-color: #20DF53;
      transform: scale(0.9);
  }
`;
export const DragContainer = styled.div``;
