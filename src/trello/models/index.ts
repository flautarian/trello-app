export interface IBoard {
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

export interface IColors{
  bgColorFromLs: string;
  bgColorFromLsD: string;
  bgColorFromLsL: string;
  bgColorFromLsN: string;
}
