import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import { v1 as uuidv1 } from 'uuid';
import List from './components/List/List';
import { DragDropContext, DropResult, Droppable, ResponderProvided } from 'react-beautiful-dnd';
import { IBoard, ICard, IList } from './models';
import { initialBoards } from './utils';
import { BoardContainer, Container, Lists, NewListButton } from './Trello.styles';
import './styles.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import authCtx from "../auth/AuthContextProvider";
import useApi from '../auth/hooks/api/useApi';

export default function Trello() {
  
  const [data, setData] = useState();
  const { request, setError } = useApi();
  const { authState, globalLogOutDispatch } = useContext(authCtx);

  const fetchData = useCallback(async () => {
    try {
      const token = authState.authToken;
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        }
      };
      await request("/check_session", params, (result) => {
        setData(result.data);
      });
    } catch (error: any) {
      setError(error.message || error);
    }
  }, [request, setError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const boardsFromLs: IBoard[] = initialBoards;

  const bgColorFromLs = localStorage.getItem('bgColor');
  const bgColorFromLsD = localStorage.getItem('bgColorD');
  const bgColorFromLsL = localStorage.getItem('bgColorL');
  const bgColorFromLsN = localStorage.getItem('bgColorN');

  const [bgColor, setBgColor] = useState(
    bgColorFromLs ? bgColorFromLs : 'white',
  );

  const [bgColorD, setBgColorD] = useState(
    bgColorFromLsD ? bgColorFromLsD : 'grey',
  );

  const [bgColorL, setBgColorL] = useState(
    bgColorFromLsL ? bgColorFromLsL : 'white',
  );

  const [bgColorN, setBgColorN] = useState(
    bgColorFromLsN ? bgColorFromLsN : 'black',
  );

  const updateColors = () => {
    setBgColor(localStorage.getItem('bgColor') || 'dodgerblue');
    setBgColorD(localStorage.getItem('bgColorD') || 'dodgerblue');
    setBgColorL(localStorage.getItem('bgColorL') || 'dodgerblue');
    setBgColorN(localStorage.getItem('bgColorN') || 'dodgerblue');
  };

  const [boards, setBoards] = useState(boardsFromLs);

  const [boardIndex, setBoardIndex] = useState(0);

  const updateBoard = (action: { type: string; payload: any }) => {
    const { indexList, indexCard, indexDestinationList, indexDestinationCard, editCardValue, editListValue, editBoardValue } = action.payload;
    const state = [...boards];
    switch (action.type) {
      case "EDIT_BOARD":
        state[boardIndex].title = editBoardValue;
        break;
      case "ADD_BOARD":
        state.push({
          id: uuidv1(),
          title: 'New Board',
          list: []
        });
        break;
      case "ADD_LIST":
        let newList: IList = {
          listTitle: 'New list',
          cards: []
        };
        state[boardIndex].list.push(newList);
        break;

      case "REMOVE_LIST":
        state[boardIndex].list = state[boardIndex].list.filter((l, i) => i !== indexList);
        break;

      case "REORDER_LIST":
        let element = state[boardIndex].list[indexList];
        const lCopy = state[boardIndex].list.filter((l, i) => i !== indexList);
        lCopy.splice(indexDestinationList, 0, element);
        state[boardIndex].list = lCopy;
        break;

      case "EDIT_LIST":
        state[boardIndex].list[indexList].listTitle = editListValue;
        break;

      case "ADD_CARD":
        let newCard: ICard = {
          text: 'New Card'
        };
        state[boardIndex].list[indexList].cards.push(newCard);
        break;

      case "REMOVE_CARD":
        state[boardIndex].list[indexList].cards = state[boardIndex].list[indexList].cards.filter((c, i) => i !== indexCard);
        break;

      case "REORDER_CARD":
        let card = state[boardIndex].list[indexList].cards[indexCard];
        state[boardIndex].list[indexList].cards = state[boardIndex].list[indexList].cards.filter((c, i) => i !== indexCard);
        state[boardIndex].list[indexDestinationList].cards.splice(indexDestinationCard, 0, card);
        break;

      case "EDIT_CARD":
        state[boardIndex].list[indexList].cards[indexCard].text = editCardValue;
        break;
    }
    setBoards([...state]);
  }

  const onDragEnd = useCallback((result: DropResult, provided: ResponderProvided) => {
    // dropped outside the list or same position
    if (!result.destination || sameTargetAsSource(result)) {
      return;
    }

    if (result.type === "COLUMN") {
      updateBoard(
        {
          type: 'REORDER_LIST',
          payload: {
            indexList: result.source.index,
            indexDestinationList: result.destination.index
          },
        })
      return;
    }
    else {
      updateBoard(
        {
          type: 'REORDER_CARD',
          payload: {
            indexList: parseInt(result.source.droppableId),
            indexDestinationList: parseInt(result.destination.droppableId),
            indexCard: result.source.index,
            indexDestinationCard: result.destination.index
          },
        })
    }

  },
    [boards, boardIndex],
  );


  const sameTargetAsSource = (result: DropResult): boolean => {
    return result.source.index == result.destination?.index &&
      result.source.droppableId == result.destination?.droppableId;
  }

  return (
    <Container bgColor={bgColor}>
      <Header colorDispatch={updateColors} currentBoard={boards[boardIndex]} updateBoard={updateBoard} />
      <Sidebar
        color={bgColorL}
        colorD={bgColorD}
        colorN={bgColorN}
        boards={boards}
        boardSelectedIndex={boardIndex}
        updateBoardIndex={setBoardIndex}
        updateBoard={updateBoard}></Sidebar>
      <Lists>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId={"board"}
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={false}
            isCombineEnabled={false}>
            {(provided, snapshot) => (
              <BoardContainer bgColor={bgColor} ref={provided.innerRef} {...provided.droppableProps}>
                {boards[boardIndex].list.map((list: IList, index: number) => (
                  <List
                    index={index}
                    list={list}
                    dispatcher={updateBoard} />
                ))}
                {provided.placeholder}
                <NewListButton
                  onClick={() => {
                    updateBoard({
                      type: 'ADD_LIST',
                      payload: {}
                    });
                  }}>
                  + New list
                </NewListButton>
              </BoardContainer>
            )}
          </Droppable>
        </DragDropContext>
      </Lists>
    </Container>
  );
}

