import styled from 'styled-components';
import { AnimationName, animations } from '../../../utils/components/globalAnimationsComponent/globalAnimationsComponent';

export const RegisterFormContainer = styled.form<{ animation: AnimationName }>`
    height: 320px;
    width: 300px;
    background-color: rgba(220,220,220,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;

    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(220,220,220,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);

    padding: 50px 35px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    letter-spacing: 0.5px;
    outline: none;
    border: none;

    font-family: "Poppins", sans-serif;
    font-weight: 700;
    font-style: bold;

    transition: transform 0.15s ease-in-out;
    animation: ${({ animation }) => animations[animation].keyframes} ${({ animation }) => animations[animation].duration} ${({ animation }) => animations[animation].type};
`;