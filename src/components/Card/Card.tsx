import React, { FunctionComponent, useState } from 'react';
import { Container, DeleteButton, EditButton, Left, Right, SaveButton } from './Card.styles';

interface ICard {
  text: string;
  indexCard: number;
  indexList: number;
  dispatcher: any;
}

const Card: FunctionComponent<ICard> = ({
  text,
  indexCard,
  indexList,
  dispatcher,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const onDeleteClick = () => {
    dispatcher({ type: 'REMOVE_CARD', payload: { indexCard, indexList } });
  };

  const onEditClick = (evt: any, id: string) => {
    setIsEdit(true);
  };

  const handleNameChange = (evt: any) => {
    const { value } = evt.target;
    dispatcher({
      type: 'EDIT_CARD',
      payload: { editCardValue: value, indexList, indexCard },
    });
  };

  return (
    <Container>
      <Left>
        {isEdit ? (
          <input
            type="text"
            defaultValue={text}
            onChange={handleNameChange}
            onBlur={() => setIsEdit(false)}
            onKeyPress={evt => {
              if (evt.key === 'Enter') {
                setIsEdit(false);
              }
            }}
          />
        ) : (
          text
        )}
      </Left>
      <Right>
        {isEdit ? (
          <SaveButton onClick={() => setIsEdit(false)}>
            Save
          </SaveButton>
        ) : (
          <>
            <EditButton onClick={evt => setIsEdit(true)}>✎</EditButton>
            <DeleteButton onClick={onDeleteClick}>&times;</DeleteButton>
          </>
        )}
      </Right>
    </Container>
  );
};

export default Card;
