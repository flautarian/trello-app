import { ICard, IList, IBoard } from '../models';

export const cardsReducer = (
  state: ICard[],
  action: { type: string; payload: any },
) => {
  const { listId, text, id } = action.payload;
  switch (action.type) {
    case 'ADD':
      const newCards = [...state, { listId, text, id }];
      return newCards;

    case 'EDIT':
      const cardsCopy = [...state];
      const { editValue } = action.payload;
      const foundCard = cardsCopy.find(card => card.id === id);
      if (foundCard) {
        foundCard.text = editValue;
      }
      return cardsCopy;

    case 'REMOVE':
      return state.filter(card => card.id !== id);

    case 'REORDER':
      const reordered = [
        ...state.filter(card => card.listId !== listId),
        ...action.payload.reorderedCards,
      ];
      return reordered;

    case 'SET':
      return action.payload.newState;

    default:
      return state;
  }
};

export const listsReducer = (
  state: IList[],
  action: { type: string; payload: any },
) => {
  const { id, listTitle } = action.payload;
  switch (action.type) {
    case 'ADD':
      return [...state, { id, listTitle }];

    case 'REMOVE':
      return state.filter(list => list.id !== id);

    case 'REORDER':
      let element = state[action.payload[0]];
      const lCopy = state.filter((l, i) => i !== action.payload[0]);
      lCopy.splice(action.payload[1], 0, element);
      return lCopy;

    case 'UPDATE_NAME':
      const listsCopy = [...state];
      const { value } = action.payload;
      const foundCard = listsCopy.find(card => card.id === id);
      if (foundCard) {
        foundCard.listTitle = value;
      }
      return listsCopy;

    case 'SET':
      return action.payload.newState;

    default:
      return state;
  }
};

export const boardsReducer = (
  state: IBoard[],
  action: { type: string; payload: any },
) => {
  const { id, boardTitle } = action.payload;
  switch (action.type) {
    case 'ADD':
      return [...state, { id, boardTitle }];

    case 'REMOVE':
      return state.filter(list => list.id !== id);

    case 'REORDER':
      let element = state[action.payload[0]];
      const lCopy = state.filter((l, i) => i !== action.payload[0]);
      lCopy.splice(action.payload[1], 0, element);
      return lCopy;

    case 'UPDATE_NAME':
      const copy = [...state];
      const { value } = action.payload;
      const found = copy.find(card => card.id === id);
      if (found) {
        found.title = value;
      }
      return copy;

    case 'SET':
      return action.payload.newState;

    default:
      return state;
  }
};
