import React, { useState, FunctionComponent } from 'react';
import { BoardElement, BoardElementAdd, Container, SidebarButton } from './Sidebar.styles';
import { IBoard } from '../../models';
import { ChevronsLeft, ChevronsRight, Plus } from 'react-feather';
import { Tooltip } from 'react-tooltip'

interface ISidebarProps {
  color: string;
  colorD: string;
  colorN: string;
  boards: IBoard[];
  boardSelectedIndex: number;
  updateBoardIndex: any;
  updateBoard: any;
}

const Sidebar: FunctionComponent<ISidebarProps> = ({ color, colorD, colorN, boards, boardSelectedIndex, updateBoardIndex, updateBoard }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getBoardsListStyle = () => ({
    marginTop: 50
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container color={color || ''} textColor={colorN || ''} showSidebar={sidebarOpen}>
      <SidebarButton onClick={toggleSidebar} showSidebar={sidebarOpen}>
        {sidebarOpen && <ChevronsLeft />}
        {!sidebarOpen && <ChevronsRight />}
      </SidebarButton>
      <div style={getBoardsListStyle()}>
        {
          boards.map((b, index: number) => (
            <>
              <BoardElement
                color={(index === boardSelectedIndex ? colorD : color || 'white')}
                textColor={colorN}
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
        color={color || 'white'}
        textColor={colorN}
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
