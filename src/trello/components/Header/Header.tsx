import React, { useState, FunctionComponent, useContext } from 'react';
import { Container, EditTitle, ItemsContainer, LoadingIcon, LogOutButton, Title } from './Header.styles';
import OptionsComponent from '../Options/Options';
import { Tooltip } from 'react-tooltip';
import { Circle, Edit2, LogOut, Save } from 'react-feather';
import trelloCtx from '../../providers/TrelloContextProvider/TrelloContextProvider';
import { TrelloActionEnum } from '../../action/TrelloActions';
import authCtx from '../../../auth/providers/AuthContextProvider';
import { useTranslation } from 'react-i18next';
import LanguageButton from '../../../utils/components/LanguageButton/LanguageButton';
import { LanguageContainer } from '../../../utils/components/LanguageButton/LanguageButton.style';
import { createNegativeColor, darkenColor, lightenColor } from '../../../utils/components/globalUtils/globalutils';

const HeaderComponent: FunctionComponent = ({ }) => {

    const [isEditingBoardTitle, setEditingBoardTitle] = useState(false);
    const { updateState, currentBoardIndex, trelloState, isLoading, isSocketConected, roomClientNumber } = useContext(trelloCtx);
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
        <Container color={trelloState.colors.bgColorFromLsL} $textcolor={trelloState.colors.bgColorFromLsN}>
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
                <OptionsComponent
                    handleBgColorChange={handleBgColorChange}
                    backgroundColor={trelloState.colors.bgColorFromLsL} />
                <Circle
                    size={34}
                    fill={isSocketConected ? '#1CFF59' : '#FF6464'}
                    data-tooltip-id={"board-socket-status-tooltip"}
                    data-tooltip-content={t(isSocketConected ? "socket-status-connected" : "socket-status-disconnected").replace("#", (roomClientNumber || 0).toString())}>
                </Circle>
                <LanguageContainer >
                    <LanguageButton />
                </LanguageContainer>
                <LogOutButton
                    $textcolor={trelloState.colors.bgColorFromLsN}
                    onClick={() => globalLogOutDispatch()}
                    data-tooltip-id={"board-logout-btn-tooltip"}
                    data-tooltip-content={t("logout")}>
                    <LogOut></LogOut>
                </LogOutButton>
            </ItemsContainer>
            <Tooltip noArrow={true} place="bottom" id={"board-logout-btn-tooltip"} />
            <Tooltip noArrow={true} place="bottom" id={"board-socket-status-tooltip"} />
        </Container>
    )
};

export default HeaderComponent;
