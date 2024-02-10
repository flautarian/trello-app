import styled from 'styled-components';
import { AnimationName, animations } from '../../../utils/components/globalAnimationsComponent/globalAnimationsComponent'

export const LoginFormContainer = styled.form<{ $animation: AnimationName }>`
    height: 50vh;
    width: 30vh;
    background-color: rgba(230,230,230,1);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;

    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(220,220,220,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    
    padding: 15px 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
    
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    font-style: bold;
    
    transition: transform 0.15s ease-in-out;
    animation: ${({ $animation }) => animations[$animation].keyframes} ${({ $animation }) => animations[$animation].duration} ${({ $animation }) => animations[$animation].type};
    `;

export const SubmitButton = styled.button`
    border-radius: 5px;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(200, 200, 200);
    transition: background-color 0.3s ease, transform 0.15s ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: #1CFF59;
        transform: scale(0.95);
    }

    &:active {
        background-color: #20DF53;
        transform: scale(0.9);
    }
    `
export const RegisterButton = styled.a`
    border-radius: 5px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(200, 200, 200);
    transition: background-color 0.3s ease, transform 0.15s ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: rgb(200, 200, 50);
        transform: scale(0.95);
    }

    &:active {
        background-color: rgb(200, 200, 50);
        transform: scale(0.9);
    }
`

export const RegisterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const ElementContainer = styled.div`
`

export const Title = styled.h2`
    font-size: x-large;
    align-self: center;
`

export const LabelElement = styled.label`
    padding-bottom: 15px;
`