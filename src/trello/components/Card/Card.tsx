import React, { FunctionComponent, useContext, useState } from 'react';
import { Container, DeleteButton, EditButton, Left, Right, SaveButton } from './Card.styles';
import trelloCtx from '../../providers/TrelloContextProvider';
import { TrelloActionEnum } from '../../action/TrelloActions';

interface ICard {
  text: string;
  indexCard: number;
  indexList: number;
}

const Card: FunctionComponent<ICard> = ({
  text,
  indexCard,
  indexList,
}) => {

  const [isEdit, setIsEdit] = useState(false);

  const { trelloState, updateState, currentBoardIndex } = useContext(trelloCtx);

  const onDeleteClick = () => {
    updateState({ type: TrelloActionEnum.REMOVE_CARD, payload: { indexBoard: currentBoardIndex, indexCard, indexList } });
  };

  const onEditClick = (evt: any, id: string) => {
    setIsEdit(true);
  };

  const handleNameChange = (evt: any) => {
    const { value } = evt.target;
    updateState({
      type: TrelloActionEnum.EDIT_CARD,
      payload: {
        indexBoard: currentBoardIndex,
        indexList,
        indexCard,
        editCardValue: value,
      },
    });
  };

  return (
    <Container>
      <Left>
        {isEdit ? (
          <input
            type="text"
            defaultValue={text}
            onBlur={() => setIsEdit(false)}
            onKeyPress={evt => {
              if (evt.key === 'Enter') {
                setIsEdit(false);
                handleNameChange(evt);
              }
            }}
          />
        ) : (
          text
        )}
      </Left>
      <Right>
        {isEdit ? (
          <SaveButton onClick={(evt) => {
            setIsEdit(false);
            handleNameChange(evt);
            }}>
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
