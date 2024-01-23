import { IBoard, IColors } from '../models/index';

export enum TrelloActionEnum {
    EDIT_BOARD = 'EDIT_BOARD',
    ADD_BOARD = 'ADD_BOARD',
    ADD_LIST = 'ADD_LIST',
    REMOVE_LIST = 'REMOVE_LIST',
    REORDER_LIST = 'REORDER_LIST',
    EDIT_LIST = 'EDIT_LIST',
    ADD_CARD = 'ADD_CARD',
    REMOVE_CARD = 'REMOVE_CARD',
    REORDER_CARD = 'REORDER_CARD',
    EDIT_CARD = 'EDIT_CARD',
    UPDATE_COLORS = 'UPDATE_COLORS',
    PULL = 'PULL'
  };
  
  export type TrelloAction = {
    type: TrelloActionEnum.EDIT_BOARD,
    payload: {
        indexBoard: number;
        editBoardValue: string;
    }
  } | 
  {
    type: TrelloActionEnum.ADD_BOARD,
    payload: {
        editBoardValue: string;
    }
  } | 
   
  {
    type: TrelloActionEnum.ADD_LIST,
    payload: {
        indexBoard: number;
    }
  } | 
   
  {
    type: TrelloActionEnum.REMOVE_LIST,
    payload: {
        indexBoard: number;
        indexList: number;
    }
  } | 
   
  {
    type: TrelloActionEnum.REORDER_LIST,
    payload: {
        indexBoard: number;
        indexList: number;
        indexDestinationList: number;
    }
  } | 
   
  {
    type: TrelloActionEnum.EDIT_LIST,
    payload: {
        indexBoard: number;
        indexList: number;
        editListValue: string;
    }
  } | 
   
  {
    type: TrelloActionEnum.ADD_CARD,
    payload: {
        indexBoard: number;
        indexList: number;
    }
  } | 
   
  {
    type: TrelloActionEnum.REMOVE_CARD,
    payload: {
        indexBoard: number;
        indexList: number;
        indexCard: number;
    }
  } | 
   
  {
    type: TrelloActionEnum.REORDER_CARD,
    payload: {
        indexBoard: number;
        indexList: number;
        indexCard: number;
        indexDestinationList: number;
        indexDestinationCard: number;
    }
  } | 
   
  {
    type: TrelloActionEnum.EDIT_CARD,
    payload: {
        indexBoard: number;
        indexList: number;
        indexCard: number;
        editCardValue: string;
    }
  } | 
   
  {
    type: TrelloActionEnum.UPDATE_COLORS,
    payload: {
        newColors: IColors
    }
  } | 
   
  {
    type: TrelloActionEnum.PULL,
    payload: {
        boards: IBoard[],
        colors: IColors
    }
  } 
