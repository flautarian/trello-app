import styled, { css } from "styled-components";


export const LanguageButtonContainer = styled.img<{$activategrayscale?: number}>`
    backgroundColor: white;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    margin-left: 5px;
    cursor: pointer;
    transition: transform 0.2s, filter 0.2s;
    filter: grayscale(${({$activategrayscale: $activategrayscale}) => $activategrayscale == 1? "100%" : "0%"});

    &:hover {
        transform: scale(0.95);
        background-color: rgba(255, 255, 255, 0.6);
        filter: grayscale(0%);
    }

    &:active {
        transform: scale(1);
    }
`
export const LanguagesContainer = styled.div<{ $enabled: number }>`
    background-color: rgba(220,220,220,1);
    border: none;
    border-radius: 5%;
    height: 50px;
    min-width: 125px;
    align-items: center;
    
    display: flex;
    justify-content: space-evenly;

    opacity: 0;
    transform: translate(-65%, 50%);
    transition: opacity 0.2s, transform 0.25s;

    ${({ $enabled }) =>
        $enabled == 1
            ? css`
          opacity: 1;
          transform: translate(-65%, 100%);
          pointer-events: auto;
        `
            : css`
          opacity: 0;
          transform: translate(-65%, 50%);
          pointer-events: none;
        `
    }`

export const LanguageContainer = styled.div`
    height: 30px;
    max-width: 50px;
    display: flex;
`