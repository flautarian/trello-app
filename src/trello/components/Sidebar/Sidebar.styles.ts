import styled from "styled-components";

export const Container = styled.div<{color: string, $textcolor: string, $showsidebar: number}>`
    
    width: 40px;
    padding: 10px;
    text-align: center;
    background: ${({ color }) => color};
    color: ${({ $textcolor }) => $textcolor};
    font-size: 20px;
    float: left;
    transition: margin-left 0.25s ease-in-out;
    margin-left: ${({ $showsidebar }) => $showsidebar ? '0px' : "-250px"};
    height: 100%;
`;

export const SidebarButton = styled.button<{$showsidebar: number}>`
    position:absolute;
    transition: left 0.25s ease-in-out, background-color 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    border-radius: 30px;
    left: ${({ $showsidebar }) => $showsidebar ? '10px' : "5px"};

    &:hover {
        transform: scale(0.95);
        background-color: rgba(255, 255, 255, 0.6);
    }
`;

export const BoardElement = styled.div<{color: string, $textcolor: string}>`
    border-radius: 25px;
    width: 40px;
    height: 35px;
    margin-top: 20px;
    background: ${({ color }) => color};
    color: ${({ $textcolor }) => $textcolor};
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    border-style: solid;
    border-color: ${({ $textcolor }) => $textcolor};
    border-width: 2px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }
`

export const BoardElementAdd = styled.div<{color: string, $textcolor: string}>`
    border-radius: 25px;
    width: 40px;
    height: 40px;
    margin-top: 20px;
    background: ${({ color }) => color};
    color: ${({ $textcolor }) => $textcolor};
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    border-style: solid;
    border-color: ${({ $textcolor }) => $textcolor};
    border-width: 2px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }
  `

export const BoardElementContainer = styled.div<{ $showsidebar: number }>`
    display: flex;
    align-items: center;
    margin-top: 20px;
    position: relative;
    
    &:hover .delete-button {
        opacity: ${({ $showsidebar }) => $showsidebar ? '1' : '0'};
    }
  `

export const DeleteButton = styled.button<{ $textcolor: string, $showsidebar: number }>`
    background: none;
    background-color: rgba(255, 99, 99, 0.3);
    position: absolute;
    right: -10px;
    border: none;
    color: ${({ $textcolor }) => $textcolor};
    cursor: pointer;
    padding: 5px;
    margin-left: 8px;
    border-radius: 15px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;
    display: ${({ $showsidebar }) => $showsidebar ? 'flex' : 'none'};

    &:hover {
        background-color: rgba(255, 99, 99, 0.8);
        transform: scale(1.1);
    }
  `