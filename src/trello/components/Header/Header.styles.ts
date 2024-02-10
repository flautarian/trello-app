import styled from "styled-components";

export const Container = styled.div<{ color: string, $textcolor: string }>`
    padding: 10px;
    text-align: center;
    background: ${({ color }) => color};
    color: ${({ $textcolor }) => $textcolor};
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const EditTitle = styled.input`
    width: fit-content;
`;

export const LogOutButton = styled.button<{ $textcolor: string }>`
    border-radius: 25%;
    max-height: 30px;
    color: ${({ $textcolor }) => $textcolor};

    transition: background 0.15s ease-in-out, transform 0.1s ease-in-out;
    transform: scale(1);

    :hover {
        background: rgba(0, 0, 0, 0.05);
        transform: scale(0.95);
    }
`;

export const ItemsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 250px;
    position: fixed;
    right: 10px;
`;

export const Title = styled.div``;

export const LoadingIcon = styled.div`
    display: flex;
    align-items: center;
`;