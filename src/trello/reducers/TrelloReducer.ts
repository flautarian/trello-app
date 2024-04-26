import { Reducer } from "react";
import { IBoard, ICard, IColors, IList } from "../models";
import { initialBoards, initialColors } from '../utils/index';
import { TrelloAction } from "../action/TrelloActions";

export interface TrelloState {
  boards: IBoard[];
  colors: IColors;
  prev?: TrelloState;
};

export const defaultTrelloState: TrelloState = {
  boards: initialBoards,
  colors: initialColors
};


export const trelloReducer: Reducer<TrelloState, TrelloAction> = (state, action) => {
  switch (action.type) {
    case "UNDO":
      if(action.payload) 
        return action.payload;
      return state;
    case "EDIT_BOARD":
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index === action.payload.indexBoard) {
            return {
              ...board,
              title: action.payload.editBoardValue
            };
          }
          return board;
        }),
        prev: state
      };
    case "ADD_BOARD":
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            title: 'New Board',
            list: []
          }
        ],
        prev: state
      };
    case "ADD_LIST":
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index === action.payload.indexBoard) {
            return {
              ...board,
              list: [
                ...board.list,
                {
                  listTitle: 'New list',
                  cards: []
                }
              ]
            };
          }
          return board;
        }),
        prev: state
      };
    case "REMOVE_LIST":
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index === action.payload.indexBoard) {
            return {
              ...board,
              list: board.list.filter((list, listIndex) => listIndex !== action.payload.indexList)
            };
          }
          return board;
        }),
        prev: state
      };
    case "REORDER_LIST":
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index === action.payload.indexBoard) {
            const { indexList, indexDestinationList } = action.payload;
            const list = [...board.list];
            const [removed] = list.splice(indexList, 1);
            list.splice(indexDestinationList, 0, removed);
            return {
              ...board,
              list
            };
          }
          return board;
        }),
        prev: state
      };
    case "EDIT_LIST":
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index === action.payload.indexBoard) {
            return {
              ...board,
              list: board.list.map((list, listIndex) => {
                if (listIndex === action.payload.indexList) {
                  return {
                    ...list,
                    listTitle: action.payload.editListValue
                  };
                }
                return list;
              })
            };
          }
          return board;
        }),
        prev: state
      };
    case "ADD_CARD":
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index === action.payload.indexBoard) {
            return {
              ...board,
              list: board.list.map((list, listIndex) => {
                if (listIndex === action.payload.indexList) {
                  return {
                    ...list,
                    cards: [
                      ...list.cards,
                      {
                        title: 'Title',
                        description: 'Description'
                      }
                    ]
                  };
                }
                return list;
              })
            };
          }
          return board;
        }),
        prev: state
      };
    case "REMOVE_CARD":
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index === action.payload.indexBoard) {
            return {
              ...board,
              list: board.list.map((list, listIndex) => {
                if (listIndex === action.payload.indexList) {
                  return {
                    ...list,
                    cards: list.cards.filter((card, cardIndex) => cardIndex !== action.payload.indexCard)
                  };
                }
                return list;
              })
            };
          }
          return board;
        }),
        prev: state
      };
    case "REORDER_CARD":
      const {
        indexBoard,
        indexList,
        indexCard,
        indexDestinationList,
        indexDestinationCard
      } = action.payload;

      const cardToMove = state.boards[indexBoard].list[indexList].cards[indexCard];
      const updatedSourceCards = indexList === indexDestinationList
        ? state.boards[indexBoard].list[indexList].cards
        : state.boards[indexBoard].list[indexList].cards.filter((_, i) => i !== indexCard);

      const updatedDestinationCards = indexList === indexDestinationList ?
      [
        ...state.boards[indexBoard].list[indexDestinationList].cards.filter((_, i) => i !== indexCard).slice(0, indexDestinationCard),
        cardToMove,
        ...state.boards[indexBoard].list[indexDestinationList].cards.filter((_, i) => i !== indexCard).slice(indexDestinationCard)
      ]
      :
      [
        ...state.boards[indexBoard].list[indexDestinationList].cards.slice(0, indexDestinationCard),
        cardToMove,
        ...state.boards[indexBoard].list[indexDestinationList].cards.slice(indexDestinationCard)
      ];

      return {
        ...state,
        boards: state.boards.map((board, i) => {
          if (i === indexBoard) {
            return {
              ...board,
              list: board.list.map((list, j) => {
                if (j === indexList) {
                  return {
                    ...list,
                    cards: indexList === indexDestinationList ? updatedDestinationCards : updatedSourceCards
                  };
                } else if (j === indexDestinationList) {
                  return {
                    ...list,
                    cards: updatedDestinationCards
                  };
                }
                return list;
              })
            };
          }
          return board;
        }),
        prev: state
      };
    case "EDIT_CARD":
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index === action.payload.indexBoard) {
            return {
              ...board,
              list: board.list.map((list, listIndex) => {
                if (listIndex === action.payload.indexList) {
                  return {
                    ...list,
                    cards: list.cards.map((card, cardIndex) => {
                      if (cardIndex === action.payload.indexCard) {
                        return action.payload.editCardValue;
                      }
                      return card;
                    })
                  };
                }
                return list;
              })
            };
          }
          return board;
        }),
        prev: state
      };
    case "PULL":
      return {
        ...state,
        boards: action.payload.boards,
        colors: action.payload.colors,
        prev: state
      };
    case "UPDATE_COLORS":
      return {
        ...state,
        colors: action.payload.newColors,
        prev: state
      };
    default:
      return state;
  }
};
