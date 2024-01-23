import React, { useState, FunctionComponent, useContext } from 'react';
import { BoardElement, BoardElementAdd, Container, SidebarButton } from './Sidebar.styles';
import { IBoard, IColors } from '../../models';
import { ChevronsLeft, ChevronsRight, Plus } from 'react-feather';
import { Tooltip } from 'react-tooltip'
import trelloCtx from '../../providers/TrelloContextProvider';
import { TrelloActionEnum } from '../../action/TrelloActions';

const Sidebar: FunctionComponent = ({}) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {trelloState, updateState, currentBoardIndex, setCurrentBoardIndex} = useContext(trelloCtx);

  const getBoardsListStyle = () => ({
    marginTop: 50
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container color={trelloState.colors.bgColorFromLsL || 'white'} textColor={trelloState.colors.bgColorFromLsN || ''} showSidebar={sidebarOpen}>
      <SidebarButton onClick={toggleSidebar} showSidebar={sidebarOpen}>
        {sidebarOpen && <ChevronsLeft />}
        {!sidebarOpen && <ChevronsRight />}
      </SidebarButton>
      <div style={getBoardsListStyle()}>
        {
          trelloState.boards.map((b, index: number) => (
            <>
              <BoardElement
                color={(index === currentBoardIndex ? trelloState.colors.bgColorFromLsD : trelloState.colors.bgColorFromLs)}
                textColor={trelloState.colors.bgColorFromLsN}
                onClick={() => setCurrentBoardIndex(index)}
                data-tooltip-id={"board-" + `${index}`}
                data-tooltip-content={b.title}>
                {index + 1}
              </BoardElement>
              <Tooltip id={"board-" + `${index}`} />
            </>
          ))
        }
      </div>

      {/* Add new Board button */}
      <BoardElementAdd
        color={trelloState.colors.bgColorFromLs}
        textColor={trelloState.colors.bgColorFromLsN}
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

export default Sidebar;
