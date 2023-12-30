import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import { v1 as uuidv1 } from 'uuid';
import groupBy from 'lodash.groupby';
import List from './components/List/List';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import Options from './components/Options/Options';
import { cardsReducer, listsReducer } from './reducers';
import { IList, ICard } from './models';
import { initialCards, initialLists } from './utils';
import { Container, Lists, NewListButton } from './App.styles';
import { reorder } from './utils';
import './styles.css';

export default function App() {

  const listsFromLs = localStorage.getItem('lists') as unknown as string;
  const cardsFromLs = localStorage.getItem('cards');
  const bgColorFromLs = localStorage.getItem('bgColor');

  const [bgColor, setBgColor] = useState(
    bgColorFromLs ? bgColorFromLs : 'dodgerblue',
  );

  const [cards, cardsDispatch] = useReducer(
    cardsReducer,
    cardsFromLs ? JSON.parse(cardsFromLs) : initialCards,
  );

  const [lists, listsDispatch] = useReducer(
    listsReducer,
    listsFromLs ? JSON.parse(listsFromLs) : initialLists,
  );

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [cards, lists]);

  const handleBgColorChange = (color: { hex: string }) => {
    setBgColor(color.hex);
    localStorage.setItem('bgColor', color.hex);
  };

  const onDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const itemsSplitByListIds = groupBy(cards, (card: any) => {
        return card.listId;
      });

      if (
        result.source.droppableId === result.destination.droppableId
      ) {
        // Items are in the same list, so just re-order the list array
        const target =
          itemsSplitByListIds[result.destination.droppableId];
        const reordered: any = reorder<ICard>(
          [...target],
          result.source.index,
          result.destination.index,
        );

        // Get rid of old list and replace with updated one
        const filteredCards = cards.filter(
          (card: any) => card.listId !== result.source.droppableId,
        );

        cardsDispatch({
          type: 'SET',
          payload: { newState: [...filteredCards, ...reordered] },
        });
      } else {
        // Items are in different lists, so just change the item's listId

        const removeByIndex = (list: any[], index: number) => [
          ...list.slice(0, index),
          ...list.slice(index + 1),
        ];

        const source = cards.filter(
          (card: ICard) => card.listId === result.source.droppableId,
        );
        const sourceWithoutDragged = removeByIndex(
          source,
          result.source.index,
        );

        const target = cards.filter(
          (card: ICard) =>
            card.listId === result.destination?.droppableId,
        );

        const itemWithNewId = {
          ...source[result.source.index],
          listId: result.destination.droppableId,
        };

        target.splice(result.destination.index, 0, itemWithNewId);

        const filteredCards = cards.filter(
          (card: any) =>
            card.listId !== result.source.droppableId &&
            card.listId !== result.destination?.droppableId,
        );

        cardsDispatch({
          type: 'SET',
          payload: {
            newState: [
              ...filteredCards,
              ...sourceWithoutDragged,
              ...target,
            ],
          },
        });
      }
    },
    [cards],
  );

  return (
    <Container bgColor={bgColor}>
      <Options handleBgColorChange={handleBgColorChange} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Lists>
          {lists.map((list: IList) => (
            <List
              key={list.id}
              list={list}
              cards={cards.filter(
                (card: ICard) => card.listId === list.id,
              )}
              cardsDispatch={cardsDispatch}
              listsDispatch={listsDispatch}
            />
          ))}
          <NewListButton
            onClick={() => {
              listsDispatch({
                type: 'ADD',
                payload: {
                  id: uuidv1(),
                  listTitle: 'new list',
                },
              });
            }}
          >
            + New list
          </NewListButton>
        </Lists>
      </DragDropContext>
    </Container>
  );
}

// When list deleted, delete all cards with that listId, otherwise loads of cards hang around in localstorage
// Remove anys
