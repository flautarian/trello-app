import React, { useState, FunctionComponent } from 'react';
import { BoardElement, BoardElementAdd, Container, SidebarButton } from './Sidebar.styles';
import { IBoard, IColors } from '../../models';
import { ChevronsLeft, ChevronsRight, Plus } from 'react-feather';
import { Tooltip } from 'react-tooltip'

interface ISidebarProps {
  colors: IColors;
  boards: IBoard[];
  boardSelectedIndex: number;
  updateBoardIndex: any;
  updateBoard: any;
}

const Sidebar: FunctionComponent<ISidebarProps> = ({ colors, boards, boardSelectedIndex, updateBoardIndex, updateBoard }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getBoardsListStyle = () => ({
    marginTop: 50
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container color={colors.bgColorFromLs || 'white'} textColor={colors.bgColorFromLsN || ''} showSidebar={sidebarOpen}>
      <SidebarButton onClick={toggleSidebar} showSidebar={sidebarOpen}>
        {sidebarOpen && <ChevronsLeft />}
        {!sidebarOpen && <ChevronsRight />}
      </SidebarButton>
      <div style={getBoardsListStyle()}>
        {
          boards.map((b, index: number) => (
            <>
              <BoardElement
                color={(index === boardSelectedIndex ? colors.bgColorFromLsD : colors.bgColorFromLs)}
                textColor={colors.bgColorFromLsN}
                onClick={() => updateBoardIndex(index)}
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
        color={colors.bgColorFromLs}
        textColor={colors.bgColorFromLsN}
        onClick={() => updateBoard(
          {
            type: 'ADD_BOARD',
            payload: {},
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
