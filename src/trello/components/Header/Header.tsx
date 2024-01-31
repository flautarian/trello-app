import React, { useState, FunctionComponent, useContext } from 'react';
import { Container, EditTitle, ItemsContainer, LoadingIcon, LogOutButton, Title } from './Header.styles';
import Options from '../Options/Options';
import { Tooltip } from 'react-tooltip';
import { Edit2, LogOut, Save } from 'react-feather';
import trelloCtx from '../../providers/TrelloContextProvider';
import { TrelloActionEnum } from '../../action/TrelloActions';
import authCtx from '../../../auth/providers/AuthContextProvider';
import { useTranslation } from 'react-i18next';
import LanguageButton from '../../../utils/components/LanguageButton/LanguageButton';
import { LanguageContainer } from '../../../utils/components/LanguageButton/LanguageButton.style';
import { createNegativeColor, darkenColor, lightenColor } from '../../../utils/components/globalUtils/globalutils';

const Header: FunctionComponent = ({ }) => {

    const [isEditingBoardTitle, setEditingBoardTitle] = useState(false);
    const { updateState, currentBoardIndex, trelloState, isLoading } = useContext(trelloCtx);
    const { globalLogOutDispatch } = useContext(authCtx);
    const { t } = useTranslation(['home']);

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
            payload: {
                newColors: {
                    bgColorFromLs: color.hex,
                    bgColorFromLsD: darkenColor(color.rgb, 0.1) || 'white',
                    bgColorFromLsL: lightenColor(color.rgb, 0.5) || 'grey',
                    bgColorFromLsN: createNegativeColor(color.rgb) || 'black'
                }
            }
        });
    };

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
                    data-tooltip-content={t("edit")}>
                    {trelloState.boards[currentBoardIndex].title}
                </Title>
            )}
            <Tooltip id={"board-edit-tooltip"} />
            <ItemsContainer>
                <LanguageContainer >
                    <LanguageButton />
                </LanguageContainer>
                <Options
                    handleBgColorChange={handleBgColorChange}
                    backgroundColor={trelloState.colors.bgColorFromLsL} />
                <LogOutButton
                    textColor={trelloState.colors.bgColorFromLsN}
                    onClick={() => globalLogOutDispatch()}
                    data-tooltip-id={"board-logout-btn-tooltip"}
                    data-tooltip-content={t("logout")}>
                    <LogOut></LogOut>
                </LogOutButton>
                <Tooltip noArrow={true} place="bottom" id={"board-logout-btn-tooltip"} />
            </ItemsContainer>
        </Container>
    )
};

export default Header;
