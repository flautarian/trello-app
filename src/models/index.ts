export interface IBoard {
  id: string;
  title: string;
  list: IList[];
}

export interface IList {
  listTitle: string;
  cards: ICard[]
}

export interface ICard {
  text: string;
}
