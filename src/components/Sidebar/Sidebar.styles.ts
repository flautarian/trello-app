import styled from "styled-components";

export const Container = styled.div<{color: string, textColor: string}>`
    padding: 10px;
    text-align: center;
    background: ${({ color }) => color};
    color: ${({ textColor }) => textColor};
    font-size: 20px;
`;