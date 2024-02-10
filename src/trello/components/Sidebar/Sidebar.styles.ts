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