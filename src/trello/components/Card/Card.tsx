import React, { FunctionComponent, useContext, useState } from 'react';
import { Container, DeleteButton, EditButton, Left, Right, SaveButton } from './Card.styles';
import trelloCtx from '../../providers/TrelloContextProvider/TrelloContextProvider';
import { TrelloActionEnum } from '../../action/TrelloActions';
import { ModalComponent, TrelloModalTypeEnum } from '../Modal/Modal';
import { ICard, CardFormTemplate } from '../../models';
import ReactDOM from 'react-dom';
import { AnimationName } from '../../../utils/components/globalAnimationsComponent/globalAnimationsComponent';

interface ICardComponent {
  card: ICard;
  indexCard: number;
  indexList: number;
}

const Card: FunctionComponent<ICardComponent> = ({
  card,
  indexCard,
  indexList,
}) => {

  const { updateState, currentBoardIndex } = useContext(trelloCtx);

  const [showModal, setShowModal] = useState(false);

  const [modalAnimation, setModalAnimation] = useState<AnimationName>("none");

  const toggleModal = (state: boolean) => {
    setModalAnimation('disappear');
    setTimeout(() => setShowModal(state), 1000);
  };

  const onDeleteClick = () => {
    updateState({ type: TrelloActionEnum.REMOVE_CARD, payload: { indexBoard: currentBoardIndex, indexCard, indexList } });
  };

  const handleNameChange = (object: ICard) => {
    updateState({
      type: TrelloActionEnum.EDIT_CARD,
      payload: {
        indexBoard: currentBoardIndex,
        indexList,
        indexCard,
        editCardValue: object,
      },
    });
    setModalAnimation('disappear');
  };

  return (
    <Container onClickCapture={() => {
      setShowModal(true);
      setModalAnimation('appear');
    }}>
      <Left>
        {card.title || "--"}
      </Left>
      {showModal &&
        ReactDOM.createPortal(
          <ModalComponent toggleModal={toggleModal} templateObject={CardFormTemplate} currentObject={card} callback={handleNameChange} deleteCallback={onDeleteClick} animation={modalAnimation} />,
          document.getElementById("modal-root") as HTMLElement
        )
      }
    </Container>
  );
};

export default Card;
