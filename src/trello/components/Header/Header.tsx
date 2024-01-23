import React, { useState, FunctionComponent, useContext } from 'react';
import { Container, EditTitle, LogOutButton, Title } from './Header.styles';
import Options from '../Options/Options';
import { Tooltip } from 'react-tooltip';
import { Edit2, LogOut } from 'react-feather';
import trelloCtx from '../../providers/TrelloContextProvider';
import { TrelloActionEnum } from '../../action/TrelloActions';

const Header: FunctionComponent = ({ }) => {

    const [isEditingBoardTitle, setEditingBoardTitle] = useState(false);
    const { updateState, currentBoardIndex, trelloState } = useContext(trelloCtx);

    const handleBoardNameChange = (evt: any) => {
        const { value } = evt.target;
        updateState({
            type: TrelloActionEnum.EDIT_BOARD,
            payload: {
                editBoardValue: value,
                indexBoard: currentBoardIndex,
            },
        });
    };

    const handleBgColorChange = (color: { hex: string, rgb: { r: number, g: number, b: number, a: number } }) => {
        updateState({
            type: TrelloActionEnum.UPDATE_COLORS,
            payload: { newColors: {
                bgColorFromLs: color.hex,
                bgColorFromLsD: darkenColor(color.rgb, 0.1) || 'white',
                bgColorFromLsL: lightenColor(color.rgb, 0.5) || 'grey',
                bgColorFromLsN: createNegativeColor(color.rgb) || 'black'
            } }
        });
    };

    const lightenColor = (color: { r: number, g: number, b: number, a: number }, factor: number): string => {
        const result = {
            r: Math.min(Math.round(color.r + 255 * factor), 255),
            g: Math.min(Math.round(color.g + 255 * factor), 255),
            b: Math.min(Math.round(color.b + 255 * factor), 255),
            a: 1
        };
        return `#${(result.r << 16 | result.g << 8 | result.b).toString(16).padStart(6, '0')}`;
    }

    const darkenColor = (color: { r: number, g: number, b: number, a: number }, factor: number): string => {
        const result = {
            r: Math.max(Math.round(color.r - 255 * factor), 0),
            g: Math.max(Math.round(color.g - 255 * factor), 0),
            b: Math.max(Math.round(color.b - 255 * factor), 0),
            a: 1
        };
        return `#${(result.r << 16 | result.g << 8 | result.b).toString(16).padStart(6, '0')}`;
    }

    function createNegativeColor(color: { r: number, g: number, b: number, a: number }): string {
        const colorAvg = (color.r + color.g + color.b) / 3;
        const negativeRed = 150 - colorAvg;
        const negativeGreen = 150 - colorAvg;
        const negativeBlue = 150 - colorAvg;

        return `rgb(${negativeRed}, ${negativeGreen}, ${negativeBlue})`;
    }

    return (
        <Container color={trelloState.colors.bgColorFromLsL} textColor={trelloState.colors.bgColorFromLsN}>
            {isEditingBoardTitle ? (
                <>
                    <EditTitle
                        type="text"
                        defaultValue={trelloState.boards[currentBoardIndex].title}
                        onBlur={() => setEditingBoardTitle(false)}
                        onKeyPress={evt => {
                            if (evt.key === 'Enter') {
                                setEditingBoardTitle(false);
                                handleBoardNameChange(evt);
                            }
                        }}
                    />
                    <Edit2 size={18}></Edit2>
                </>
            ) : (
                <Title onClick={() => setEditingBoardTitle(true)}
                    data-tooltip-id={"board-edit-tooltip"}
                    data-tooltip-content={"edit"}>
                    {trelloState.boards[currentBoardIndex].title}
                </Title>
            )}
            <Tooltip id={"board-edit-tooltip"} />
            <Options handleBgColorChange={handleBgColorChange} />
            <LogOutButton color={trelloState.colors.bgColorFromLs} textColor={trelloState.colors.bgColorFromLsN}>
                <LogOut></LogOut>
            </LogOutButton>
        </Container>
    )
};

export default Header;
