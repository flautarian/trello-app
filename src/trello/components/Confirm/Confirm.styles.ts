import styled from "styled-components";
import { AnimationName, animations } from '../../../utils/components/globalAnimationsComponent/globalAnimationsComponent';

export const ConfirmBackground = styled.div<({ $animation: AnimationName }) >`
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 14;
    animation: ${(props) => animations[props.$animation].keyframes} ${({ $animation }) => animations[$animation].duration} ${({ $animation }) => animations[$animation].type};
`

export const CardModalContainer = styled.div<({ $bgcolor: string, $animation: AnimationName, $xorigin?: string, $yorigin?: string, $xtarget?: string, $ytarget?: string }) >`
    z-index: 15;
    width: auto;
    height: auto;
    position: absolute;
    background-color: ${({ $bgcolor }) => $bgcolor};
    font-family: poppins-medium, sans-serif;
    border-radius: 15px;
    left: 30%;
    top: 5%;

    display: flex;
    flex-direction: column;

    padding: 5px 10px 5px 10px;
    backdrop-filter: blur(10px);
    border-width: 1px 1px 2px
    border: solid rgba(220,220,220,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    
    animation: ${(props) => animations[props.$animation].keyframes} ${({ $animation }) => animations[$animation].duration} ${({ $animation }) => animations[$animation].type};
`

export const ConfirmButton = styled.button<{$bgcolor: string, $bghovercolor: string}>`
    border-radius: 5px;
    font-family: poppins;
    font-size: 18px;
    width: 125px;
    height: 40px;
    
    background-color: ${({ $bgcolor }) => $bgcolor};
    transition: background-color 0.3s ease, transform 0.15s ease-in-out;
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

export const HeaderModal = styled.div<{ $bgcolor: string }>`
    width: 70vh;
    height: auto;
    min-height: 5vh;
    background-color: ${({ $bgcolor }) => $bgcolor};
    font-family: poppins;
    font-size: 28px;
    border-radius: 15px 15px 0px 0px ;
    margin-top: 10px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align: center;
    align-items: center;
}
`

export const BodyModalForm = styled.div<{ $bgcolor: string }>`
    width: 70vh;
    height: 10vh;
    max-height: 20vh;
    background-color: ${({ $bgcolor }) => $bgcolor};
    font-family: poppins;
    margin-top: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align: center;
    align-items: center;
    overflow: auto;
`

export const BodyModalElementContainer = styled.div`
    width: 90%;
    margin: 5px 0;
    padding-left: 5%;
`

export const FooterModal = styled.div<{ $bgcolor: string }>`
    width: 70vh;
    height: 10vh;
    background-color: ${({ $bgcolor }) => $bgcolor};
    border-radius: 0px 0px 15px 15px;
    font-family: poppins;
    display: flex;
    margin-top: 10px;
    justify-content: space-evenly;
    align-items: center;
`

export const CloseButton = styled.div`
    float: left;
    position: absolute;
    right: 20px; 
    top: 20px;
    border-radius: 25px;
`