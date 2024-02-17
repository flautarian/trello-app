import { DragDropContext, DropResult, Droppable, ResponderProvided } from 'react-beautiful-dnd';
import { BoardContainer, Container, Lists, NewListButton } from './Trello.styles';
import trelloCtx from './providers/TrelloContextProvider/TrelloContextProvider';
import React, { useCallback, useContext, FunctionComponent } from 'react';
import { TrelloActionEnum } from './action/TrelloActions';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import List from './components/List/List';
import { IList } from './models';
import './styles.css';

const Trello: FunctionComponent = ({ }) => {
  // Trello context
  const { trelloState, updateState, currentBoardIndex } = useContext(trelloCtx);

  const onDragEnd = useCallback((result: DropResult, provided: ResponderProvided) => {
    // dropped outside the list or same position
    if (!result.destination || sameTargetAsSource(result)) {
      return;
    }

    if (result.type === "COLUMN") {
      updateState({
        type: TrelloActionEnum.REORDER_LIST,
        payload: {
          indexBoard: currentBoardIndex,
          indexList: result.source.index,
          indexDestinationList: result.destination.index
        }
      });
    }
    else {
      updateState({
        type: TrelloActionEnum.REORDER_CARD,
        payload: {
          indexBoard: currentBoardIndex,
          indexList: parseInt(result.source.droppableId),
          indexDestinationList: parseInt(result.destination.droppableId),
          indexCard: result.source.index,
          indexDestinationCard: result.destination.index
        }
      });
    }
  },
    [updateState, trelloState, currentBoardIndex],
  );

  const sameTargetAsSource = (result: DropResult): boolean => {
    return result.source.index == result.destination?.index &&
      result.source.droppableId == result.destination?.droppableId;
  }

  return (
    <Container $bgcolor={trelloState.colors.bgColorFromLs}>
      <>
        <Header />
        <Sidebar></Sidebar>
        <Lists>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId={"board"}
              type="COLUMN"
              direction="horizontal"
              ignoreContainerClipping={false}
              isCombineEnabled={false}
              key={"board-droppable"}>
              {(provided, snapshot) => (
                <BoardContainer
                  $bgcolor={trelloState.colors.bgColorFromLs}
                  ref={provided.innerRef}
                  key={"board-container"}
                  {...provided.droppableProps}>
                  {trelloState.boards[currentBoardIndex].list.map((list: IList, index: number) => (
                    <List indexList={index} list={list} key={"list-" + index} />
                  ))}
                  {provided.placeholder}
                  <NewListButton
                    key={"new-list-board-" + currentBoardIndex}
                    $xorigin='0%'
                    $yorigin='25%'
                    $xtarget='0%'
                    $ytarget='0%'
                    onClick={() => {
                      updateState({
                        type: TrelloActionEnum.ADD_LIST,
                        payload: {
                          indexBoard: currentBoardIndex
                        }
                      });
                    }}>
                    + New list
                  </NewListButton>
                </BoardContainer>
              )}
            </Droppable>
          </DragDropContext>
        </Lists>
      </>
    </Container>
  );
}

export default Trello;
