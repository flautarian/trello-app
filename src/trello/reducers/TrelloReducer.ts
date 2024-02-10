import { Reducer } from "react";
import { IBoard, ICard, IColors, IList } from "../models";
import { initialBoards, initialColors } from '../utils/index';
import { TrelloAction } from "../action/TrelloActions";

export interface TrelloState {
  boards: IBoard[];
  colors: IColors;
};

export const defaultTrelloState: TrelloState = {
  boards: initialBoards,
  colors: initialColors
};


export const trelloReducer: Reducer<TrelloState, TrelloAction> = (state, action) => {

  switch (action.type) {

    case "EDIT_BOARD":
      state.boards[action.payload.indexBoard].title = action.payload.editBoardValue;
      break;

    case "ADD_BOARD":
      state.boards.push({
        title: 'New Board',
        list: []
      });
      break;

    case "ADD_LIST":
      let newList: IList = {
        listTitle: 'New list',
        cards: []
      };
      state.boards[action.payload.indexBoard].list.push(newList);
      break;

    case "REMOVE_LIST":
      state.boards[action.payload.indexBoard].list = state.boards[action.payload.indexBoard].list.filter((l, i) => i !== action.payload.indexList);
      break;

    case "REORDER_LIST":
      let element = state.boards[action.payload.indexBoard].list[action.payload.indexList];
      const lCopy = state.boards[action.payload.indexBoard].list.filter((l, i) => i !== action.payload.indexList);
      lCopy.splice(action.payload.indexDestinationList, 0, element);
      state.boards[action.payload.indexBoard].list = lCopy;
      break;

    case "EDIT_LIST":
      state.boards[action.payload.indexBoard].list[action.payload.indexList].listTitle = action.payload.editListValue;
      break;

    case "ADD_CARD":
      let newCard: ICard = {
        text: 'New Card'
      };
      state.boards[action.payload.indexBoard].list[action.payload.indexList].cards.push(newCard);
      break;

    case "REMOVE_CARD":
      state.boards[action.payload.indexBoard].list[action.payload.indexList].cards = state.boards[action.payload.indexBoard].list[action.payload.indexList].cards.filter((c, i) => i !== action.payload.indexCard);
      break;

    case "REORDER_CARD":
      let card = state.boards[action.payload.indexBoard].list[action.payload.indexList].cards[action.payload.indexCard];
      state.boards[action.payload.indexBoard].list[action.payload.indexList].cards = state.boards[action.payload.indexBoard].list[action.payload.indexList].cards.filter((c, i) => i !== action.payload.indexCard);
      state.boards[action.payload.indexBoard].list[action.payload.indexDestinationList].cards.splice(action.payload.indexDestinationCard, 0, card);
      break;

    case "EDIT_CARD":
      state.boards[action.payload.indexBoard].list[action.payload.indexList].cards[action.payload.indexCard] = action.payload.editCardValue;
      break;

    case "PULL":
      state.boards = action.payload.boards;
      state.colors = action.payload.colors;
      break;
    
    case "UPDATE_COLORS":
      state.colors = action.payload.newColors;
      break;
  }
  return state;
}