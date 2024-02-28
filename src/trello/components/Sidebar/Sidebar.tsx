import React, { useState, FunctionComponent, useContext } from 'react';
import { BoardElement, BoardElementAdd, Container, SidebarButton } from './Sidebar.styles';
import { ChevronsLeft, ChevronsRight, Plus } from 'react-feather';
import { Tooltip } from 'react-tooltip'
import trelloCtx from '../../providers/TrelloContextProvider/TrelloContextProvider';
import { TrelloActionEnum } from '../../action/TrelloActions';
import { useTranslation } from 'react-i18next';

const SidebarComponent: FunctionComponent = ({ }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { trelloState, updateState, currentBoardIndex, setCurrentBoardIndex } = useContext(trelloCtx);

  const getBoardsListStyle = () => ({
    marginTop: 50
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { t } = useTranslation(['home']);

  return (
    <Container color={trelloState.colors.bgColorFromLsL || 'white'} $textcolor={trelloState.colors.bgColorFromLsN || ''} $showsidebar={sidebarOpen ? 1 : 0}>
      <SidebarButton onClick={toggleSidebar} $showsidebar={sidebarOpen ? 1 : 0}>
        {sidebarOpen && <ChevronsLeft />}
        {!sidebarOpen && <ChevronsRight />}
      </SidebarButton>
      <div style={getBoardsListStyle()}>
        {
          trelloState.boards.map((b, index: number) => (
            <div key={"board-element-" + index}>
              <BoardElement
                color={(index === currentBoardIndex ? trelloState.colors.bgColorFromLsD : trelloState.colors.bgColorFromLs)}
                $textcolor={trelloState.colors.bgColorFromLsN}
                onClick={() => setCurrentBoardIndex(index)}
                data-tooltip-id={"board-" + `${index}`}
                data-tooltip-content={b.title}>
                {index + 1}
              </BoardElement>

              <Tooltip
                id={"board-" + `${index}`}
                style={{
                  backgroundColor: trelloState.colors.bgColorFromLsL,
                  color: trelloState.colors.bgColorFromLsN
                }}
                className='poppins-medium' />
            </div>
          ))
        }
      </div>

      {/* Add new Board button */}
      <BoardElementAdd
        color={trelloState.colors.bgColorFromLs}
        $textcolor={trelloState.colors.bgColorFromLsN}
        onClick={() => updateState(
          {
            type: TrelloActionEnum.ADD_BOARD,
            payload: {
              editBoardValue: "new-board"
            },
          }
        )}
        data-tooltip-id={"new-board"}
        data-tooltip-content={"Add new board"}>
        <Plus></Plus>
      </BoardElementAdd>
    </Container>
  )
};

export default SidebarComponent;
