export interface IBoard {
  title: string;
  list: IList[];
}

export interface IList {
  listTitle: string;
  cards: ICard[]
}

export interface ICard {
  title: string;
  description: string;
}

export interface IColors {
  bgColorFromLs: string;
  bgColorFromLsD: string;
  bgColorFromLsL: string;
  bgColorFromLsN: string;
}

export interface ContainerProps {
  isFocused: boolean;
}

export const CardFormTemplate = {
  values: [
    {
      name: "title",
      iname: "title",
      type: "text",
      defaultValue: "Title"
    },
    {
      name: "description",
      iname: "description",
      type: "textarea",
      defaultValue: "Description"
    }
  ]
}
