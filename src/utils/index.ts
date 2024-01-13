import _ from 'lodash';
import { IList, ICard, IBoard } from '../models';
import { v1 as uuidv1 } from 'uuid';

export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const initialCards: ICard[] = [
  {
    text: 'First Card',
  },
  {
    text: 'Second Card',
  },
];

export const initialLists: IList[] = [
  {
    listTitle: 'Todo 📝',
    cards: _.cloneDeep(initialCards)
  },
  {
    listTitle: 'In progress 👌',
    cards: _.cloneDeep(initialCards)
  },
  {
    listTitle: 'Done ✅',
    cards: _.cloneDeep(initialCards)
  },
];

export const initialBoards: IBoard[] = [
  {
    id: uuidv1(),
    title: 'Board 1',
    list: _.cloneDeep(initialLists),
  },
  {
    id: uuidv1(),
    title: 'Board 2',
    list: _.cloneDeep(initialLists),
  },
  {
    id: uuidv1(),
    title: 'Board 3',
    list: _.cloneDeep(initialLists),
  },
];
