import React, {
  useCallback,
  useContext,
  FunctionComponent,
} from 'react';
import List from './components/List/List';
import { DragDropContext, DropResult, Droppable, ResponderProvided } from 'react-beautiful-dnd';
import { BoardContainer, Container, Lists, NewListButton } from './Trello.styles';
import './styles.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import trelloCtx from './providers/TrelloContextProvider';
import { TrelloActionEnum } from './action/TrelloActions';
import { IList } from './models';

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
      <Container bgColor={trelloState.colors.bgColorFromLs}>
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
                  isCombineEnabled={false}>
                  {(provided, snapshot) => (
                    <BoardContainer bgColor={trelloState.colors.bgColorFromLs} ref={provided.innerRef} {...provided.droppableProps}>
                      {trelloState.boards[currentBoardIndex].list.map((list: IList, index: number) => (
                        <List indexList={index} list={list} />
                      ))}
                      {provided.placeholder}
                      <NewListButton
                        key={"new-list-board-" + currentBoardIndex}
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
