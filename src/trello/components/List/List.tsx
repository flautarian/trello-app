import React, { useState, FunctionComponent } from 'react';
import {
  Container,
  Header,
  CloseButton,
  Title,
  AddCardButton,
} from './List.styles';
import Card from '../Card/Card';
import { v1 as uuidv1 } from 'uuid';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { IList, ICard } from '../../models';

interface IListProps {
  list: IList;
  index: number;
  dispatcher: any;
}

const List: FunctionComponent<IListProps> = ({
  list,
  index: indexList,
  dispatcher,
}) => {
  const [isEditingName, setEditingName] = useState(false);

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: any,
  ) => ({
    background: 'white',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '5px',
    border: '1px solid rgb(178,185,197)',
    borderBottom: '2px solid rgb(178,185,197)',
    ...draggableStyle,
  });

  //TODO: isDraggingOver need functionality
  const getListStyle = (isDraggingOver: boolean) => ({
    minHeight: 70
  });

  const handleNameChange = (evt: any) => {
    const { value } = evt.target;
    dispatcher({
      type: 'EDIT_LIST',
      payload: { editListValue: value, indexList },
    });
  };

  return (
    <Draggable key={indexList} draggableId={`${indexList}`} index={indexList}>
      {(provided, snapshot) => (
        <Container isDragging={snapshot.isDragging} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Header isDragging={snapshot.isDragging}>
            {isEditingName ? (
              <input
                type="text"
                defaultValue={list.listTitle}
                onChange={handleNameChange}
                onBlur={() => setEditingName(false)}
                onKeyPress={evt => {
                  if (evt.key === 'Enter') {
                    setEditingName(false);
                  }
                }}
              />
            ) : (
              <Title onClick={() => setEditingName(true)}>
                {list.listTitle}
              </Title>
            )}
            <CloseButton
              onClick={() =>
                dispatcher({
                  type: 'REMOVE_LIST',
                  payload: { indexList },
                })
              }>
              &times;
            </CloseButton>
          </Header>
          <Droppable
            droppableId={`${indexList}`}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {list.cards.map((card: ICard, cardIndex: number) => (
                  <Draggable
                    key={cardIndex}
                    index={cardIndex}
                    draggableId={`draggable-${indexList}-${cardIndex}`}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        <Card
                          key={cardIndex}
                          text={card.text}
                          indexCard={cardIndex}
                          indexList={indexList}
                          dispatcher={dispatcher}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddCardButton
            onClick={evt =>
              dispatcher({
                type: 'ADD_CARD',
                payload: { indexList },
              })
            }
          >
            + Add a card
          </AddCardButton>
        </Container>
      )}
    </Draggable>
  );
};

export default List;
