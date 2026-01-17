import React, { useState, FunctionComponent, useContext } from 'react';
import { BoardElement, BoardElementAdd, Container, SidebarButton, DeleteButton, BoardElementContainer } from './Sidebar.styles';
import { ChevronsLeft, ChevronsRight, Plus, Trash2 } from 'react-feather';
import { Tooltip } from 'react-tooltip'
import trelloCtx from '../../providers/TrelloContextProvider/TrelloContextProvider';
import { TrelloActionEnum } from '../../action/TrelloActions';
import { useTranslation } from 'react-i18next';
import { ConfirmComponent } from '../Confirm/Confirm';
import { createPortal } from 'react-dom';
import { AnimationName } from '../../../utils/components/globalAnimationsComponent/globalAnimationsComponent';

const SidebarComponent: FunctionComponent = ({ }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [boardToDeleteIndex, setBoardToDeleteIndex] = useState<number | null>(null);
  const [modalDeleteAnimation, setModalDeleteAnimation] = useState<AnimationName>('appear');

  const { trelloState, updateState, currentBoardIndex, setCurrentBoardIndex } = useContext(trelloCtx);

  const getBoardsListStyle = () => ({
    marginTop: 50
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDeleteBoard = (index: number) => {
    setBoardToDeleteIndex(index);
    setModalDeleteAnimation('appear');
    setDeleteConfirmModal(true);
  };

  const deleteBoardCallback = (confirm: boolean) => {
    if (confirm && boardToDeleteIndex !== null) {
      updateState({
        type: TrelloActionEnum.DELETE_BOARD,
        payload: { indexBoard: boardToDeleteIndex }
      });

      // Adjust currentBoardIndex if necessary
      if (boardToDeleteIndex === currentBoardIndex) {
        // If deleting the current board, select the previous board or first board
        const newIndex = boardToDeleteIndex > 0 ? boardToDeleteIndex - 1 : 0;
        setCurrentBoardIndex(Math.min(newIndex, trelloState.boards.length - 2));
      } else if (boardToDeleteIndex < currentBoardIndex) {
        // If deleting a board before the current one, adjust index
        setCurrentBoardIndex(currentBoardIndex - 1);
      }
    }
    setDeleteConfirmModal(false);
    setBoardToDeleteIndex(null);
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
            <BoardElementContainer key={"board-element-" + index} $showsidebar={sidebarOpen ? 1 : 0}>
              <BoardElement
                color={(index === currentBoardIndex ? trelloState.colors.bgColorFromLsD : trelloState.colors.bgColorFromLs)}
                $textcolor={trelloState.colors.bgColorFromLsN}
                onClick={() => setCurrentBoardIndex(index)}
                data-tooltip-id={"board-" + `${index}`}
                data-tooltip-content={b.title}>
                {index + 1}
              </BoardElement>
              <DeleteButton
                className="delete-button"
                $textcolor={trelloState.colors.bgColorFromLsN}
                $showsidebar={sidebarOpen ? 1 : 0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteBoard(index);
                }}
                data-tooltip-id={"delete-board-" + `${index}`}
                data-tooltip-content={t("deleteBoard")}>
                <Trash2 size={16} />
              </DeleteButton>

              <Tooltip
                id={"board-" + `${index}`}
                style={{
                  backgroundColor: trelloState.colors.bgColorFromLsL,
                  color: trelloState.colors.bgColorFromLsN
                }}
                className='poppins-medium' />
              
              <Tooltip
                id={"delete-board-" + `${index}`}
                style={{
                  backgroundColor: trelloState.colors.bgColorFromLsL,
                  color: trelloState.colors.bgColorFromLsN
                }}
                className='poppins-medium' />
            </BoardElementContainer>
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

      {
        deleteConfirmModal && createPortal(
          <ConfirmComponent 
            animation={modalDeleteAnimation} 
            title='deleteBoard' 
            text='deleteBoardConfirm' 
            callback={deleteBoardCallback} 
            confirmColor='#1CFF59' 
            cancelColor='#FF6464' 
          />,
          document.getElementById("modal-root") as HTMLElement
        )
      }
    </Container>
  )
};

export default SidebarComponent;
