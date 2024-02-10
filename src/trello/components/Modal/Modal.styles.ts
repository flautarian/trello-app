import styled from "styled-components";
import { AnimationName, animations } from "../../../utils/components/globalAnimationsComponent/globalAnimationsComponent";


export const CardModalContainer = styled.div<({ $bgcolor: string, $animation: AnimationName, $xorigin?: string, $yorigin?: string, $xtarget?: string, $ytarget?: string })>`
    z-index: 10;
    width: auto;
    height: auto;
    position: absolute;
    background-color: ${({ $bgcolor }) => $bgcolor};
    font-family: poppins-medium, sans-serif;
    border-radius: 15px;
    left: 30%;
    top: 15%;

    display: flex;
    flex-direction: column;

    padding: 5px 10px 5px 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(220,220,220,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    
    animation: ${(props) => animations[props.$animation].keyframes} ${({ $animation }) => animations[$animation].duration} ${({ $animation }) => animations[$animation].type};
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
    justify-content: space-evenly;
    align-items: center;
}
`

export const BodyModal = styled.form<{ $bgcolor: string }>`
    width: 70vh;
    height: 10vh;
    background-color: ${({ $bgcolor }) => $bgcolor};
    font-family: poppins-light;
    display: flex;
    margin-top: 10px;
`
export const FooterModal = styled.div<{ $bgcolor: string }>`
    width: 70vh;
    height: 10vh;
    background-color: ${({ $bgcolor }) => $bgcolor};
    border-radius: 0px 0px 15px 15px;
    font-family: poppins-light;
    display: flex;
    margin-top: 10px;
`

export const CloseButton = styled.div`
    float: left;
    position: absolute;
    right: 20px; 
    top: 20px;
    border-radius: 25px;
`