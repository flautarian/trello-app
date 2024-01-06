export interface ICard {
  id: string;
  text: string;
  listId: string;
}

export interface IList {
  id: string;
  boardId: string;
  listTitle: string;
}

export interface IBoard {
  id: string;
  title: string;
}
