import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  user-select: none;
  font-family: "Poppins", sans-serif;
`;

export const Left = styled.div`
  display: flex;
`;

export const Right = styled.div`
  margin-left: auto;
  display: flex;
`;

export const SaveButton = styled.button`
  background: mediumseagreen;
  color: white;

  :hover {
    background: lightseagreen;
  }
`;

export const DeleteButton = styled.button`
  border-radius: 25px;
  max-width: 35px;
  transition: background-color 0.1s ease-in-out;

  &:hover{
    background-color: rgb(255, 100, 100);
  }
`


export const EditButton = styled.button`
  border-radius: 25px;
  max-width: 24px;
  transition: background-color 0.1s ease-in-out;
  display: flex;
  justify-content: center;

  &:hover{
    background-color: rgb(100, 100, 255);
  }
`
