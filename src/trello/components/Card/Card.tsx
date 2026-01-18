import React, { FunctionComponent, useContext, useState } from 'react';
import { Container, Left } from './Card.styles';
import trelloCtx from '../../providers/TrelloContextProvider/TrelloContextProvider';
import { TrelloActionEnum } from '../../action/TrelloActions';
import { EditModalComponent } from '../EditModal/EditModal';
import { ICard, CardFormTemplate } from '../../models';
import ReactDOM from 'react-dom';
import { AnimationName } from '../../../utils/components/globalAnimationsComponent/globalAnimationsComponent';


interface ICardComponent {
  card: ICard;
  indexCard: number;
  indexList: number;
}

const CardComponent: FunctionComponent<ICardComponent> = ({
  card,
  indexCard,
  indexList,
}) => {

  const openEditCard = () => {
    if (!showModal) {
      setShowModal(true);
      setModalAnimation('appear');
    }
  }

  const { trelloState, updateState, currentBoardIndex, currentCardIndex, setCurrentCardIndex } = useContext(trelloCtx);

  const [showModal, setShowModal] = useState(false);
  const cardId = "" + indexList +  indexCard;

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

  const handleDoubleClick = () => {
    openEditCard();
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCurrentCardIndex(cardId === currentCardIndex ? "" : cardId);
  }

  return (
    <Container 
      onDoubleClick={handleDoubleClick}
      onClick={handleClick} $isfocused={currentCardIndex === cardId} 
      $bgcolor={trelloState.colors.bgColorFromLsL} 
      $bglsColor={trelloState.colors.bgColorFromLs}
      tabIndex={0}>
      <Left>
        {card.title || "--"}
      </Left>
      {showModal &&
        ReactDOM.createPortal(
          <EditModalComponent toggleModal={toggleModal} templateObject={CardFormTemplate} currentObject={card} callback={handleNameChange} deleteCallback={onDeleteClick} animation={modalAnimation} />,
          document.getElementById("modal-root") as HTMLElement
        )
      }
    </Container>
  );
};

export default CardComponent;
