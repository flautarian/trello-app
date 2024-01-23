import styled from "styled-components";

export const Container = styled.div<{color: string, textColor: string}>`
    padding: 10px;
    text-align: center;
    background: ${({ color }) => color};
    color: ${({ textColor }) => textColor};
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const EditTitle = styled.input`
    width: fit-content;
`;

export const LogOutButton = styled.button<{color: string, textColor: string}>`
    padding: 10px;
    text-align: center;
    background: ${({ color }) => color};
    color: ${({ textColor }) => textColor};
`;

export const Title = styled.div``;